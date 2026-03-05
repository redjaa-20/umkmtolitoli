-- 1. Create the `kategori` table
CREATE TABLE public.kategori (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.kategori ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies to allow anyone to read the categories
CREATE POLICY "Enable public read access for kategori" ON public.kategori
    FOR SELECT USING (true);

-- 4. Data Seeding Script
INSERT INTO public.kategori (name) VALUES 
('Kuliner'),
('Fashion & Tekstil'),
('Jasa'),
('Retail / Toko'),
('Kesehatan & Kecantikan'),
('Kerajinan'),
('Otomotif'),
('Properti'),
('Pendidikan'),
('Pertanian & Peternakan'),
('Teknologi & Digital');
