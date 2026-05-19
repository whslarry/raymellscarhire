/*
  # World Cup Ticket Booking - Full Schema

  ## Tables Created (in dependency order)
  1. `wc_profiles` - Extended user profiles (name, phone, role: fan|admin)
  2. `wc_stadiums` - Stadium info (name, city, capacity)
  3. `wc_matches` - Match fixtures (teams, stadium, datetime, status)
  4. `wc_seat_zones` - Pricing zones per match (VIP, Cat1, Cat2, Cat3)
  5. `wc_seats` - Individual seat inventory per zone per match
  6. `wc_cart_holds` - Temporary 10-min seat reservations (concurrency lock)
  7. `wc_bookings` - Confirmed bookings with reference number
  8. `wc_booking_items` - Line items linking bookings to individual seats

  ## Concurrency Strategy
  - Seat holds use UNIQUE constraint on seat_id in wc_cart_holds
  - Seat status updated with optimistic locking (UPDATE WHERE status = 'available')
  - release_expired_holds() cleans up stale holds and frees seats

  ## Security
  - RLS on all tables; admin role checked via wc_profiles.role = 'admin'
  - Users can only see/modify their own bookings, holds, and profiles
*/

-- ============================================================
-- 1. PROFILES (must be first — other tables' policies reference it)
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  nationality text DEFAULT '',
  role text NOT NULL DEFAULT 'fan' CHECK (role IN ('fan', 'admin')),
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wc_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON wc_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON wc_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON wc_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- 2. STADIUMS
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_stadiums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  capacity integer NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wc_stadiums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view stadiums"
  ON wc_stadiums FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert stadiums"
  ON wc_stadiums FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update stadiums"
  ON wc_stadiums FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 3. MATCHES
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  home_team_flag text DEFAULT '',
  away_team_flag text DEFAULT '',
  stadium_id uuid NOT NULL REFERENCES wc_stadiums(id) ON DELETE RESTRICT,
  match_date timestamptz NOT NULL,
  stage text NOT NULL DEFAULT 'Group Stage',
  group_name text DEFAULT '',
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wc_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view matches"
  ON wc_matches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert matches"
  ON wc_matches FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update matches"
  ON wc_matches FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 4. SEAT ZONES (per match, e.g. VIP Block A, Category 1 North)
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_seat_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid NOT NULL REFERENCES wc_matches(id) ON DELETE CASCADE,
  zone_name text NOT NULL,
  zone_code text NOT NULL,
  category text NOT NULL CHECK (category IN ('VIP', 'Category 1', 'Category 2', 'Category 3')),
  price_usd numeric(10,2) NOT NULL DEFAULT 0,
  total_seats integer NOT NULL DEFAULT 0,
  available_seats integer NOT NULL DEFAULT 0,
  color_hex text NOT NULL DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now(),
  UNIQUE (match_id, zone_code)
);

CREATE INDEX IF NOT EXISTS idx_wc_seat_zones_match ON wc_seat_zones(match_id);

ALTER TABLE wc_seat_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view seat zones"
  ON wc_seat_zones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert seat zones"
  ON wc_seat_zones FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update seat zones"
  ON wc_seat_zones FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 5. INDIVIDUAL SEATS
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_seats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid NOT NULL REFERENCES wc_matches(id) ON DELETE CASCADE,
  zone_id uuid NOT NULL REFERENCES wc_seat_zones(id) ON DELETE CASCADE,
  row_label text NOT NULL,
  seat_number integer NOT NULL,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'held', 'booked')),
  created_at timestamptz DEFAULT now(),
  UNIQUE (match_id, zone_id, row_label, seat_number)
);

CREATE INDEX IF NOT EXISTS idx_wc_seats_match_zone ON wc_seats(match_id, zone_id);
CREATE INDEX IF NOT EXISTS idx_wc_seats_status ON wc_seats(status);

ALTER TABLE wc_seats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view seats"
  ON wc_seats FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert seats"
  ON wc_seats FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can update seat status"
  ON wc_seats FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 6. CART HOLDS (10-minute concurrency locks)
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_cart_holds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seat_id uuid NOT NULL REFERENCES wc_seats(id) ON DELETE CASCADE,
  match_id uuid NOT NULL REFERENCES wc_matches(id) ON DELETE CASCADE,
  zone_id uuid NOT NULL REFERENCES wc_seat_zones(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '10 minutes'),
  created_at timestamptz DEFAULT now(),
  UNIQUE (seat_id)
);

CREATE INDEX IF NOT EXISTS idx_wc_cart_holds_user ON wc_cart_holds(user_id);
CREATE INDEX IF NOT EXISTS idx_wc_cart_holds_expires ON wc_cart_holds(expires_at);

ALTER TABLE wc_cart_holds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart holds"
  ON wc_cart_holds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart holds"
  ON wc_cart_holds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart holds"
  ON wc_cart_holds FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- 7. BOOKINGS (confirmed orders)
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  match_id uuid NOT NULL REFERENCES wc_matches(id) ON DELETE RESTRICT,
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'refunded')),
  payment_method text NOT NULL DEFAULT 'card',
  booking_reference text UNIQUE NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wc_bookings_user ON wc_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_wc_bookings_match ON wc_bookings(match_id);

ALTER TABLE wc_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON wc_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON wc_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings"
  ON wc_bookings FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM wc_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 8. BOOKING ITEMS (seats per booking)
-- ============================================================
CREATE TABLE IF NOT EXISTS wc_booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES wc_bookings(id) ON DELETE CASCADE,
  seat_id uuid NOT NULL REFERENCES wc_seats(id) ON DELETE RESTRICT,
  zone_id uuid NOT NULL REFERENCES wc_seat_zones(id) ON DELETE RESTRICT,
  price_paid numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wc_booking_items_booking ON wc_booking_items(booking_id);

ALTER TABLE wc_booking_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own booking items"
  ON wc_booking_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM wc_bookings WHERE id = booking_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can insert own booking items"
  ON wc_booking_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM wc_bookings WHERE id = booking_id AND user_id = auth.uid())
  );

-- ============================================================
-- TRIGGER: Auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_wc_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO wc_profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_wc ON auth.users;
CREATE TRIGGER on_auth_user_created_wc
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_wc_user();

-- ============================================================
-- FUNCTION: Release expired cart holds & free seats
-- ============================================================
CREATE OR REPLACE FUNCTION release_expired_wc_holds()
RETURNS integer AS $$
DECLARE
  released integer;
BEGIN
  UPDATE wc_seats
  SET status = 'available'
  WHERE id IN (
    SELECT seat_id FROM wc_cart_holds WHERE expires_at < now()
  );
  GET DIAGNOSTICS released = ROW_COUNT;
  DELETE FROM wc_cart_holds WHERE expires_at < now();
  RETURN released;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
