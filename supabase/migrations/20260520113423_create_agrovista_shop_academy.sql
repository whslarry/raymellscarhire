/*
  # AgroVista Dual Platform - Shop & Academy Tables

  ## Tables Created
  1. `agro_vegetables` - Product catalog for the vegetable shop (name, price, unit, category, image, stock, featured)
  2. `agro_education` - Educational resources (title, type: video/guide/workshop, description, image, duration, download_url, schedule)
  3. `agro_cart_items` - Shopping cart items per user (user_id, vegetable_id, quantity)
  4. `agro_orders` - Confirmed orders (user_id, total, status, items JSON)
  5. `agro_enrollments` - Education enrollments per user (user_id, education_id)

  ## Security
  - RLS on all tables
  - Vegetables & education: read-only for authenticated users
  - Cart items, orders, enrollments: users can only access their own data
*/

-- Vegetables catalog
CREATE TABLE IF NOT EXISTS agro_vegetables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'leafy',
  price_per_kg numeric(8,2) NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'kg',
  image_url text DEFAULT '',
  description text DEFAULT '',
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_vegetables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view vegetables"
  ON agro_vegetables FOR SELECT
  TO authenticated
  USING (true);

-- Educational resources
CREATE TABLE IF NOT EXISTS agro_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'guide' CHECK (type IN ('video', 'guide', 'workshop')),
  description text DEFAULT '',
  image_url text DEFAULT '',
  duration text DEFAULT '',
  download_url text DEFAULT '',
  schedule_date timestamptz,
  schedule_location text DEFAULT '',
  instructor text DEFAULT '',
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view education"
  ON agro_education FOR SELECT
  TO authenticated
  USING (true);

-- Cart items
CREATE TABLE IF NOT EXISTS agro_cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vegetable_id uuid NOT NULL REFERENCES agro_vegetables(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, vegetable_id)
);

ALTER TABLE agro_cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart items"
  ON agro_cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON agro_cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON agro_cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON agro_cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders
CREATE TABLE IF NOT EXISTS agro_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  items jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON agro_orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON agro_orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Education enrollments
CREATE TABLE IF NOT EXISTS agro_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  education_id uuid NOT NULL REFERENCES agro_education(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, education_id)
);

ALTER TABLE agro_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON agro_enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON agro_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own enrollments"
  ON agro_enrollments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
