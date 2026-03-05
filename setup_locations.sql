-- 1. Create the `kecamatan` table
CREATE TABLE public.kecamatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the `desa` table
CREATE TABLE public.desa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kecamatan_id UUID NOT NULL REFERENCES public.kecamatan(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(kecamatan_id, name) -- Prevent duplicate village names within the same subdistrict
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.kecamatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.desa ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies to allow anyone to read the locations
CREATE POLICY "Enable public read access for kecamatan" ON public.kecamatan
    FOR SELECT USING (true);

CREATE POLICY "Enable public read access for desa" ON public.desa
    FOR SELECT USING (true);

-- 5. Data Seeding Script
-- We use a DO block to insert kecamatan first, store their IDs in a temporary table/variables, and then insert the related desas.
DO $$
DECLARE
    v_dampal_selatan UUID;
    v_dampal_utara UUID;
    v_dondo UUID;
    v_basidondo UUID;
    v_ogodeide UUID;
    v_lampasio UUID;
    v_baolan UUID;
    v_galang UUID;
    v_tolitoli_utara UUID;
    v_dakopemean UUID;
BEGIN
    -- Insert Kecamatan and capture UUIDs
    INSERT INTO public.kecamatan (name) VALUES ('Dampal Selatan') RETURNING id INTO v_dampal_selatan;
    INSERT INTO public.kecamatan (name) VALUES ('Dampal Utara') RETURNING id INTO v_dampal_utara;
    INSERT INTO public.kecamatan (name) VALUES ('Dondo') RETURNING id INTO v_dondo;
    INSERT INTO public.kecamatan (name) VALUES ('Basidondo') RETURNING id INTO v_basidondo;
    INSERT INTO public.kecamatan (name) VALUES ('Ogodeide') RETURNING id INTO v_ogodeide;
    INSERT INTO public.kecamatan (name) VALUES ('Lampasio') RETURNING id INTO v_lampasio;
    INSERT INTO public.kecamatan (name) VALUES ('Baolan') RETURNING id INTO v_baolan;
    INSERT INTO public.kecamatan (name) VALUES ('Galang') RETURNING id INTO v_galang;
    INSERT INTO public.kecamatan (name) VALUES ('Tolitoli Utara') RETURNING id INTO v_tolitoli_utara;
    INSERT INTO public.kecamatan (name) VALUES ('Dakopemean') RETURNING id INTO v_dakopemean;

    -- Insert Desas for Dampal Selatan
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_dampal_selatan, 'Abbajareng'), (v_dampal_selatan, 'Bangkir'), (v_dampal_selatan, 'Dongko'), (v_dampal_selatan, 'Kombo'), (v_dampal_selatan, 'Lemba Harapan'), (v_dampal_selatan, 'Lempe'), (v_dampal_selatan, 'Mimbala'), (v_dampal_selatan, 'Paddumpu'), (v_dampal_selatan, 'Pallakawe'), (v_dampal_selatan, 'Puse'), (v_dampal_selatan, 'Simuntu'), (v_dampal_selatan, 'Soni'), (v_dampal_selatan, 'Tampiala');

    -- Insert Desas for Dampal Utara
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_dampal_utara, 'Balaroa'), (v_dampal_utara, 'Bambapula'), (v_dampal_utara, 'Banagan'), (v_dampal_utara, 'Kabinuang'), (v_dampal_utara, 'Malambigu'), (v_dampal_utara, 'Ogolali'), (v_dampal_utara, 'Ogotua'), (v_dampal_utara, 'Sese'), (v_dampal_utara, 'Simatang Tanjung'), (v_dampal_utara, 'Simatang Utara'), (v_dampal_utara, 'Stadong'), (v_dampal_utara, 'Tompoh');

    -- Insert Desas for Dondo
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_dondo, 'Anggasan'), (v_dondo, 'Bambapun'), (v_dondo, 'Betengon'), (v_dondo, 'Lais'), (v_dondo, 'Lobuo'), (v_dondo, 'Luok Manipi'), (v_dondo, 'Malala'), (v_dondo, 'Malomba'), (v_dondo, 'Malulu'), (v_dondo, 'Pangkung'), (v_dondo, 'Ogogasang'), (v_dondo, 'Ogogili'), (v_dondo, 'Ogowele'), (v_dondo, 'Ogowele Buga'), (v_dondo, 'Salumbia'), (v_dondo, 'Tinabogan');

    -- Insert Desas for Basidondo
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_basidondo, 'Basi'), (v_basidondo, 'Galandau'), (v_basidondo, 'Labonu'), (v_basidondo, 'Kayu Lompa'), (v_basidondo, 'Kinapasan'), (v_basidondo, 'Kongkomos'), (v_basidondo, 'Marisa'), (v_basidondo, 'Ogosipat'), (v_basidondo, 'Sibaluton'), (v_basidondo, 'Silondou');

    -- Insert Desas for Ogodeide
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_ogodeide, 'Bambalaga'), (v_ogodeide, 'Bauilo'), (v_ogodeide, 'Bilo'), (v_ogodeide, 'Buga'), (v_ogodeide, 'Kabetan'), (v_ogodeide, 'Kamalu'), (v_ogodeide, 'Labuan Lobo'), (v_ogodeide, 'Muara Besar'), (v_ogodeide, 'Pagaitan'), (v_ogodeide, 'Pulias'), (v_ogodeide, 'Sambujan');

    -- Insert Desas for Lampasio
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_lampasio, 'Janja'), (v_lampasio, 'Lampasio'), (v_lampasio, 'Maibua'), (v_lampasio, 'Mulya Sari'), (v_lampasio, 'Ogomatanang'), (v_lampasio, 'Oyom'), (v_lampasio, 'Salugan'), (v_lampasio, 'Sibea'), (v_lampasio, 'Tinading');

    -- Insert Desas for Baolan
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_baolan, 'Baru'), (v_baolan, 'Buntuna'), (v_baolan, 'Dadakitan'), (v_baolan, 'Lelean Nono'), (v_baolan, 'Nalu'), (v_baolan, 'Panasakan'), (v_baolan, 'Pangi'), (v_baolan, 'Sidoarjo'), (v_baolan, 'Tambun'), (v_baolan, 'Tuweley');

    -- Insert Desas for Galang
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_galang, 'Aung'), (v_galang, 'Bajugan'), (v_galang, 'Ginunggung'), (v_galang, 'Kalangkangan'), (v_galang, 'Lakatan'), (v_galang, 'Lalos'), (v_galang, 'Lantapan'), (v_galang, 'Kinopasan'), (v_galang, 'Malangga'), (v_galang, 'Ogomoli'), (v_galang, 'Sabang'), (v_galang, 'Sandana'), (v_galang, 'Tende'), (v_galang, 'Tinigi');

    -- Insert Desas for Tolitoli Utara
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_tolitoli_utara, 'Binontoan'), (v_tolitoli_utara, 'Diule'), (v_tolitoli_utara, 'Gio'), (v_tolitoli_utara, 'Lakuan Tolitoli'), (v_tolitoli_utara, 'Laulalang'), (v_tolitoli_utara, 'Pinjan'), (v_tolitoli_utara, 'Salumpaga'), (v_tolitoli_utara, 'Santigi'), (v_tolitoli_utara, 'Teluk Jaya'), (v_tolitoli_utara, 'Timbolo');

    -- Insert Desas for Dakopemean
    INSERT INTO public.desa (kecamatan_id, name) VALUES 
    (v_dakopemean, 'Dungingis'), (v_dakopemean, 'Galumpang'), (v_dakopemean, 'Kapas'), (v_dakopemean, 'Lingadan');

END $$;
