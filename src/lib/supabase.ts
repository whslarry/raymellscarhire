import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone: string;
  nationality: string;
  role: 'fan' | 'admin';
  avatar_url: string;
  created_at: string;
};

export type Stadium = {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image_url: string;
  description: string;
};

export type Match = {
  id: string;
  home_team: string;
  away_team: string;
  home_team_flag: string;
  away_team_flag: string;
  stadium_id: string;
  match_date: string;
  stage: string;
  group_name: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  wc_stadiums?: Stadium;
};

export type SeatZone = {
  id: string;
  match_id: string;
  zone_name: string;
  zone_code: string;
  category: 'VIP' | 'Category 1' | 'Category 2' | 'Category 3';
  price_usd: number;
  total_seats: number;
  available_seats: number;
  color_hex: string;
};

export type Seat = {
  id: string;
  match_id: string;
  zone_id: string;
  row_label: string;
  seat_number: number;
  status: 'available' | 'held' | 'booked';
};

export type CartHold = {
  id: string;
  user_id: string;
  seat_id: string;
  match_id: string;
  zone_id: string;
  expires_at: string;
  wc_seats?: Seat;
  wc_seat_zones?: SeatZone;
};

export type Booking = {
  id: string;
  user_id: string;
  match_id: string;
  total_amount: number;
  status: 'confirmed' | 'cancelled' | 'refunded';
  payment_method: string;
  booking_reference: string;
  created_at: string;
  wc_matches?: Match;
  wc_booking_items?: BookingItem[];
};

export type BookingItem = {
  id: string;
  booking_id: string;
  seat_id: string;
  zone_id: string;
  price_paid: number;
  wc_seats?: Seat;
  wc_seat_zones?: SeatZone;
};
