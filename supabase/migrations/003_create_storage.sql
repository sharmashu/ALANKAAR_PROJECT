
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true);

-- Create policy for public read access to images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Create policy for authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Create policy for admins to delete images
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE 
USING (
  bucket_id = 'images' AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);
