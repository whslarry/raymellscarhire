/*
  # AgroVista - Seed Data

  Seeds products, testimonials, and blog posts for the agricultural website.
*/

-- Products
INSERT INTO agro_products (name, category, price, unit, description, image_url, features, featured) VALUES
  ('Organic Wheat Grain', 'Grains', 420.00, 'per ton', 'Premium hard red winter wheat, grown without synthetic pesticides or fertilizers. Ideal for artisan flour milling.',
   'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['USDA Organic Certified', 'Non-GMO Project Verified', 'High protein content (13%+)'], true),
  ('Heritage Corn Seeds', 'Seeds', 28.50, 'per lb', 'Open-pollinated heirloom corn variety with rich flavor profiles. Drought-tolerant and adapted to diverse growing conditions.',
   'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['Open-pollinated', 'Drought tolerant', '95% germination rate'], true),
  ('Cold-Pressed Sunflower Oil', 'Oils', 14.99, 'per liter', 'Single-origin, cold-pressed sunflower oil with a delicate, nutty flavor. Rich in vitamin E and omega-6 fatty acids.',
   'https://images.pexels.com/photos/33783/oil-olive-oil-kitchen-cook.jpg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['Cold-pressed', 'No additives', 'Rich in Vitamin E'], true),
  ('Raw Wildflower Honey', 'Specialty', 22.00, 'per jar', 'Unfiltered, raw honey harvested from wildflower meadows. Pure, natural sweetness with local pollinator benefits.',
   'https://images.pexels.com/photos/54304/pexels-photo-54304.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['Raw & unfiltered', 'Local wildflower source', 'No artificial additives'], false),
  ('Organic Soybean Meal', 'Feed', 385.00, 'per ton', 'High-protein soybean meal for livestock feed. Sourced from certified organic farms with full traceability.',
   'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['44% protein content', 'Fully traceable', 'Organic certified'], false),
  ('Heirloom Tomato Seeds', 'Seeds', 12.00, 'per packet', 'A curated mix of 5 heirloom tomato varieties — Brandywine, Cherokee Purple, Green Zebra, San Marzano, and Black Krim.',
   'https://images.pexels.com/photos/2255453/pexels-photo-2255453.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['5 variety mix', 'Open-pollinated', 'Indeterminate types'], true),
  ('Premium Alfalfa Hay', 'Feed', 195.00, 'per ton', 'Top-grade alfalfa hay bales with excellent leaf-to-stem ratio. Tested for moisture and nutrient content.',
   'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['RFV 180+', 'Moisture < 14%', 'Weed-free certified'], false),
  ('Organic Quinoa', 'Grains', 58.00, 'per kg', 'Tri-color organic quinoa grown at high altitude. Complete protein source with all 9 essential amino acids.',
   'https://images.pexels.com/photos/6587580/pexels-photo-6587580.jpeg?auto=compress&cs=tinysrgb&w=800',
   ARRAY['Complete protein', 'High altitude grown', 'Fair trade certified'], false)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO agro_testimonials (name, role, company, quote, rating, image_url, featured) VALUES
  ('Sarah Mitchell', 'Head of Procurement', 'GreenMill Bakeries', 'AgroVista''s organic wheat has transformed our artisan bread line. Consistent quality, reliable delivery, and full traceability from field to flour.', 5,
   'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', true),
  ('James Okonkwo', 'Farm Director', 'Sunrise Collective', 'The heritage seed program gave us varieties we couldn''t find anywhere else. Our crop diversity has doubled, and the drought tolerance saved us last season.', 5,
   'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200', true),
  ('Dr. Elena Vasquez', 'Agricultural Researcher', 'TerraVerde Institute', 'Their data-driven approach to sustainable farming sets a new standard. We reference their yield optimization methods in our published research.', 5,
   'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', true),
  ('Michael Chen', 'Restaurant Owner', 'Harvest Table Kitchen', 'The cold-pressed sunflower oil is a game-changer for our kitchen. The flavor profile is unmatched, and knowing its origin matters to our diners.', 4,
   'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200', false)
ON CONFLICT DO NOTHING;

-- Blog posts
INSERT INTO agro_blog_posts (title, excerpt, content, category, image_url, author, featured) VALUES
  ('The Future of Regenerative Agriculture', 'How soil-first farming practices are reshaping the industry and boosting long-term yields by up to 40%.', 'Regenerative agriculture goes beyond sustainability — it actively restores soil health, increases biodiversity, and sequesters carbon. In this deep dive, we explore the core principles, real-world case studies, and the economic case for making the transition.', 'Sustainability',
   'https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dr. Elena Vasquez', true),
  ('Precision Irrigation: Saving Water, Boosting Yields', 'Smart irrigation systems reduce water usage by 30% while increasing crop output. Here is how the technology works.', 'Modern precision irrigation leverages IoT sensors, weather data, and AI-driven scheduling to deliver exactly the right amount of water at the right time. This article breaks down the technology stack, ROI calculations, and implementation strategies for farms of all sizes.', 'Technology',
   'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800', 'AgroVista Team', true),
  ('From Seed to Shelf: Our Supply Chain Transparency', 'Every product in our catalog carries a full traceability record. Learn how we ensure quality at every step.', 'Transparency is not just a buzzword — it is the foundation of trust. We map every product from the field it was grown in to the warehouse it ships from, with third-party verification at each checkpoint.', 'Company',
   'https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sarah Mitchell', true),
  ('5 Heirloom Varieties Every Farm Should Try', 'Diversify your crop portfolio with these resilient, flavorful heritage varieties that thrive in changing climates.', 'Heirloom varieties offer genetic diversity that modern hybrids cannot match. We profile five standout crops — from drought-hardy sorghum to cold-tolerant fava beans — and share planting guides for each.', 'Farming Tips',
   'https://images.pexels.com/photos/2255453/pexels-photo-2255453.jpeg?auto=compress&cs=tinysrgb&w=800', 'James Okonkwo', false)
ON CONFLICT DO NOTHING;
