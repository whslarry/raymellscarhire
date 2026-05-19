/*
  # World Cup Demo Seed Data

  Seeds stadiums, matches, seat zones, and individual seats.
*/

-- Stadiums
INSERT INTO wc_stadiums (id, name, city, country, capacity, image_url, description) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Lusail Iconic Stadium', 'Lusail', 'Qatar', 88966,
   'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
   'The crown jewel of FIFA World Cup 2026, hosting the opening match and final.'),
  ('a1000000-0000-0000-0000-000000000002', 'MetLife Stadium', 'New York', 'USA', 82500,
   'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
   'One of the largest stadiums in the NFL, hosting key World Cup fixtures in New York.'),
  ('a1000000-0000-0000-0000-000000000003', 'SoFi Stadium', 'Los Angeles', 'USA', 70240,
   'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
   'State-of-the-art stadium in Los Angeles hosting World Cup matches.'),
  ('a1000000-0000-0000-0000-000000000004', 'Azteca Stadium', 'Mexico City', 'Mexico', 87523,
   'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800',
   'Legendary stadium, venue for two previous World Cup finals. Historic ground.'),
  ('a1000000-0000-0000-0000-000000000005', 'BC Place', 'Vancouver', 'Canada', 54500,
   'https://images.pexels.com/photos/1007901/pexels-photo-1007901.jpeg?auto=compress&cs=tinysrgb&w=800',
   'Canada''s premier multi-purpose stadium hosting World Cup Group Stage matches.')
ON CONFLICT (id) DO NOTHING;

-- Matches
INSERT INTO wc_matches (id, home_team, away_team, home_team_flag, away_team_flag, stadium_id, match_date, stage, group_name, status) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Brazil', 'Argentina', '🇧🇷', '🇦🇷',
   'a1000000-0000-0000-0000-000000000001', '2026-06-15 18:00:00+00', 'Group Stage', 'Group C', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000002', 'France', 'Germany', '🇫🇷', '🇩🇪',
   'a1000000-0000-0000-0000-000000000002', '2026-06-16 21:00:00+00', 'Group Stage', 'Group E', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000003', 'Spain', 'England', '🇪🇸', '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
   'a1000000-0000-0000-0000-000000000003', '2026-06-17 19:00:00+00', 'Group Stage', 'Group D', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000004', 'Mexico', 'USA', '🇲🇽', '🇺🇸',
   'a1000000-0000-0000-0000-000000000004', '2026-06-18 22:00:00+00', 'Group Stage', 'Group B', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000005', 'Portugal', 'Morocco', '🇵🇹', '🇲🇦',
   'a1000000-0000-0000-0000-000000000005', '2026-06-19 17:00:00+00', 'Group Stage', 'Group F', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000006', 'Netherlands', 'Senegal', '🇳🇱', '🇸🇳',
   'a1000000-0000-0000-0000-000000000001', '2026-06-20 15:00:00+00', 'Group Stage', 'Group A', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000007', 'Japan', 'South Korea', '🇯🇵', '🇰🇷',
   'a1000000-0000-0000-0000-000000000002', '2026-06-22 18:00:00+00', 'Group Stage', 'Group H', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000008', 'Italy', 'Croatia', '🇮🇹', '🇭🇷',
   'a1000000-0000-0000-0000-000000000003', '2026-07-05 20:00:00+00', 'Quarter-Final', '', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000009', 'Brazil', 'France', '🇧🇷', '🇫🇷',
   'a1000000-0000-0000-0000-000000000004', '2026-07-14 19:00:00+00', 'Semi-Final', '', 'upcoming'),
  ('b1000000-0000-0000-0000-000000000010', 'Argentina', 'Spain', '🇦🇷', '🇪🇸',
   'a1000000-0000-0000-0000-000000000001', '2026-07-19 20:00:00+00', 'Final', '', 'upcoming')
ON CONFLICT (id) DO NOTHING;

-- Seed seat zones and seats using a function to avoid variable ambiguity
CREATE OR REPLACE FUNCTION seed_wc_zones_and_seats()
RETURNS void AS $$
DECLARE
  v_match_id uuid;
  v_zone_id uuid;
  v_row text;
  v_seat integer;
  v_rows text[] := ARRAY['A','B','C','D','E','F','G','H','I','J'];
BEGIN
  FOR v_match_id IN SELECT id FROM wc_matches LOOP

    -- VIP Zone (50 seats: 5 rows x 10)
    INSERT INTO wc_seat_zones (match_id, zone_code, zone_name, category, price_usd, total_seats, available_seats, color_hex)
    VALUES (v_match_id, 'VIP', 'VIP Executive Box', 'VIP', 850.00, 50, 50, '#EAB308')
    ON CONFLICT (match_id, zone_code) DO NOTHING
    RETURNING id INTO v_zone_id;
    IF v_zone_id IS NOT NULL THEN
      FOREACH v_row IN ARRAY v_rows[1:5] LOOP
        FOR v_seat IN 1..10 LOOP
          INSERT INTO wc_seats (match_id, zone_id, row_label, seat_number, status)
          VALUES (v_match_id, v_zone_id, v_row, v_seat, 'available')
          ON CONFLICT DO NOTHING;
        END LOOP;
      END LOOP;
    END IF;
    v_zone_id := NULL;

    -- Category 1 (150 seats: 10 rows x 15)
    INSERT INTO wc_seat_zones (match_id, zone_code, zone_name, category, price_usd, total_seats, available_seats, color_hex)
    VALUES (v_match_id, 'CAT1', 'Category 1 - Premium', 'Category 1', 350.00, 150, 150, '#3B82F6')
    ON CONFLICT (match_id, zone_code) DO NOTHING
    RETURNING id INTO v_zone_id;
    IF v_zone_id IS NOT NULL THEN
      FOREACH v_row IN ARRAY v_rows LOOP
        FOR v_seat IN 1..15 LOOP
          INSERT INTO wc_seats (match_id, zone_id, row_label, seat_number, status)
          VALUES (v_match_id, v_zone_id, v_row, v_seat, 'available')
          ON CONFLICT DO NOTHING;
        END LOOP;
      END LOOP;
    END IF;
    v_zone_id := NULL;

    -- Category 2 (200 seats: 10 rows x 20)
    INSERT INTO wc_seat_zones (match_id, zone_code, zone_name, category, price_usd, total_seats, available_seats, color_hex)
    VALUES (v_match_id, 'CAT2', 'Category 2 - Standard', 'Category 2', 150.00, 200, 200, '#10B981')
    ON CONFLICT (match_id, zone_code) DO NOTHING
    RETURNING id INTO v_zone_id;
    IF v_zone_id IS NOT NULL THEN
      FOREACH v_row IN ARRAY v_rows LOOP
        FOR v_seat IN 1..20 LOOP
          INSERT INTO wc_seats (match_id, zone_id, row_label, seat_number, status)
          VALUES (v_match_id, v_zone_id, v_row, v_seat, 'available')
          ON CONFLICT DO NOTHING;
        END LOOP;
      END LOOP;
    END IF;
    v_zone_id := NULL;

    -- Category 3 (300 seats: 10 rows x 30)
    INSERT INTO wc_seat_zones (match_id, zone_code, zone_name, category, price_usd, total_seats, available_seats, color_hex)
    VALUES (v_match_id, 'CAT3', 'Category 3 - Economy', 'Category 3', 75.00, 300, 300, '#6B7280')
    ON CONFLICT (match_id, zone_code) DO NOTHING
    RETURNING id INTO v_zone_id;
    IF v_zone_id IS NOT NULL THEN
      FOREACH v_row IN ARRAY v_rows LOOP
        FOR v_seat IN 1..30 LOOP
          INSERT INTO wc_seats (match_id, zone_id, row_label, seat_number, status)
          VALUES (v_match_id, v_zone_id, v_row, v_seat, 'available')
          ON CONFLICT DO NOTHING;
        END LOOP;
      END LOOP;
    END IF;
    v_zone_id := NULL;

  END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT seed_wc_zones_and_seats();
DROP FUNCTION IF EXISTS seed_wc_zones_and_seats();
