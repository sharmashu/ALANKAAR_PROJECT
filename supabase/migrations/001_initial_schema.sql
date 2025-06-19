
-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  stock INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'processing',
  payment_status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Orders are viewable by owner" ON orders FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (users with admin role can manage everything)
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can view all orders" ON orders FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Insert sample data
INSERT INTO categories (name, image) VALUES
('Posters', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop'),
('Frames', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop'),
('Neon Signs', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop'),
('Stickers', 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=300&h=400&fit=crop');

INSERT INTO products (title, description, price, category, image, stock, tags) VALUES
('Abstract Art Poster', 'Beautiful abstract art perfect for modern homes', 299, 'Posters', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop', 50, '{"abstract", "modern", "colorful"}'),
('Vintage Frame Set', 'Set of 3 vintage-style frames', 899, 'Frames', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop', 25, '{"vintage", "set", "classic"}'),
('Custom Neon Sign', 'Personalized neon sign for your space', 1999, 'Neon Signs', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop', 10, '{"custom", "neon", "led"}'),
('Motivational Stickers', 'Pack of inspirational stickers', 199, 'Stickers', 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=300&h=400&fit=crop', 100, '{"motivational", "pack", "inspiration"}');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products table
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
