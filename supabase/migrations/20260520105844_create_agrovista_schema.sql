/*
  # AgroVista - Agricultural Website Schema

  ## Tables Created
  1. `agro_contacts` - Contact form submissions (name, email, subject, message)
  2. `agro_newsletter` - Newsletter email subscriptions (unique email)
  3. `agro_products` - Products/services catalog (name, category, price, description, image, featured flag)
  4. `agro_testimonials` - Customer testimonials (name, role, quote, rating, image)
  5. `agro_blog_posts` - Blog articles (title, excerpt, content, category, image, author, published date)

  ## Security
  - RLS enabled on all tables
  - Contact form and newsletter: anyone authenticated can insert
  - Products, testimonials, blog: read-only for authenticated users
  - No public (anon) access — all requires authentication
*/

-- Contact form submissions
CREATE TABLE IF NOT EXISTS agro_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can submit contacts"
  ON agro_contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS agro_newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE agro_newsletter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can subscribe"
  ON agro_newsletter FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Products/Services catalog
CREATE TABLE IF NOT EXISTS agro_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'produce',
  price numeric(10,2) DEFAULT 0,
  unit text DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  features text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view products"
  ON agro_products FOR SELECT
  TO authenticated
  USING (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS agro_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT '',
  company text DEFAULT '',
  quote text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agro_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view testimonials"
  ON agro_testimonials FOR SELECT
  TO authenticated
  USING (true);

-- Blog posts
CREATE TABLE IF NOT EXISTS agro_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  category text DEFAULT 'General',
  image_url text DEFAULT '',
  author text DEFAULT 'AgroVista Team',
  published_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false
);

ALTER TABLE agro_blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view blog posts"
  ON agro_blog_posts FOR SELECT
  TO authenticated
  USING (true);
