/*
  # AgroVista - Seed Vegetable & Education Data

  Seeds 8 featured vegetables and 3 educational resources.
*/

-- Vegetables
INSERT INTO agro_vegetables (name, slug, category, price_per_kg, unit, image_url, description, in_stock, featured, sort_order) VALUES
  ('Organic Tomatoes', 'organic-tomatoes', 'fruit', 4.50, 'kg', 'https://images.pexels.com/photos/53575/table-tomatoes-vegetables-food-53575.jpeg?auto=compress&cs=tinysrgb&w=600', 'Vine-ripened organic tomatoes grown in nutrient-rich soil. Sweet, juicy, and perfect for salads or sauces.', true, true, 1),
  ('Fresh Spinach', 'fresh-spinach', 'leafy', 3.25, 'kg', 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=600', 'Tender baby spinach leaves packed with iron and vitamins. Harvested at dawn for maximum freshness.', true, true, 2),
  ('Red Bell Peppers', 'red-bell-peppers', 'fruit', 5.75, 'kg', 'https://images.pexels.com/photos/736367/pexels-photo-736367.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sweet red bell peppers, hand-picked at peak ripeness. Vibrant color and crisp texture.', true, true, 3),
  ('Baby Carrots', 'baby-carrots', 'root', 3.00, 'kg', 'https://images.pexels.com/photos/143133/tomatoes-vegetables-food-healthy-143133.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sweet, crunchy baby carrots from local organic farms. Great for snacking and cooking.', true, true, 4),
  ('Green Beans', 'green-beans', 'legume', 4.00, 'kg', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600', 'Freshly picked green beans with a satisfying snap. Steam, sauté, or enjoy raw.', true, false, 5),
  ('Purple Eggplant', 'purple-eggplant', 'fruit', 3.50, 'kg', 'https://images.pexels.com/photos/615704/pexels-photo-615704.jpeg?auto=compress&cs=tinysrgb&w=600', 'Glossy purple eggplant with creamy flesh. Ideal for grilling, roasting, or Baba Ghanoush.', true, false, 6),
  ('Broccoli Crowns', 'broccoli-crowns', 'cruciferous', 4.25, 'kg', 'https://images.pexels.com/photos/4734912/pexels-photo-4734912.jpeg?auto=compress&cs=tinysrgb&w=600', 'Tight, dark-green broccoli crowns bursting with nutrients. Steam or roast for best flavor.', true, false, 7),
  ('Butternut Squash', 'butternut-squash', 'gourd', 2.75, 'kg', 'https://images.pexels.com/photos/615702/pexels-photo-615702.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sweet butternut squash with smooth, orange flesh. Perfect for soups, roasts, and pies.', true, false, 8)
ON CONFLICT (slug) DO NOTHING;

-- Educational Resources
INSERT INTO agro_education (title, slug, type, description, image_url, duration, download_url, schedule_date, schedule_location, instructor, featured, sort_order) VALUES
  ('Drip Irrigation Mastery', 'drip-irrigation-mastery', 'video', 'A comprehensive video tutorial covering drip irrigation system design, installation, and maintenance. Learn to reduce water usage by 60% while maximizing crop yield through precision delivery.', 'https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=600', '45 min', '', NULL, NULL, 'Dr. Kofi Mensah', true, 1),
  ('Soil Health Field Guide', 'soil-health-field-guide', 'guide', 'A downloadable 32-page guide covering soil testing, composting, cover cropping, and regenerative techniques to restore degraded farmland. Includes printable worksheets and seasonal planners.', 'https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=600', '', '/guides/soil-health-2025.pdf', NULL, NULL, 'Prof. Amara Johnson', true, 2),
  ('Organic Pest Control Workshop', 'organic-pest-control-workshop', 'workshop', 'Hands-on workshop covering integrated pest management (IPM), beneficial insect habitats, and organic spray formulations. Includes live demonstrations and Q&A with certified agronomists.', 'https://images.pexels.com/photos/2255453/pexels-photo-2255453.jpeg?auto=compress&cs=tinysrgb&w=600', '3 hours', '', '2026-06-28 09:00:00+00', 'Green Valley Community Center', 'Maria Santos', true, 3)
ON CONFLICT (slug) DO NOTHING;
