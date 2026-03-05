-- 1. Create the `usaha` table
CREATE TABLE public.usaha (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    kategori_id UUID NOT NULL REFERENCES public.kategori(id),
    desa_id UUID NOT NULL REFERENCES public.desa(id),
    whatsapp TEXT NOT NULL,
    maps_url TEXT,
    image_url TEXT,
    is_recommended BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.usaha ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for the `usaha` table
CREATE POLICY "Enable public read access for usaha" ON public.usaha
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.usaha
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable update for owners" ON public.usaha
    FOR UPDATE TO authenticated USING (auth.uid() = owner_id);

CREATE POLICY "Enable delete for owners" ON public.usaha
    FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- 4. Set up Supabase Storage Bucket for Business Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('umkm_images', 'umkm_images', true) 
ON CONFLICT (id) DO NOTHING;

-- 5. Set up RLS Policies for the Storage Bucket
CREATE POLICY "Public read access" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'umkm_images');

CREATE POLICY "Authenticated users can upload" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'umkm_images');

CREATE POLICY "Users can update their own images" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'umkm_images' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own images" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'umkm_images' AND auth.uid() = owner);
