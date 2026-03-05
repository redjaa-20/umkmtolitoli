import type { Metadata } from "next";

import { CariUmkmView } from "src/sections/cari-umkm/view";
import { createClient } from "src/lib/supabase/server";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Cari UMKM | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.from("usaha").select(`
      id,
      name,
      description,
      image_url,
      is_recommended,
      kategori:kategori_id(name),
      desa:desa_id(name)
    `);

  const mappedUmkm = (data || []).map((row: any) => ({
    name: row.name,
    image: row.image_url || "/assets/images/umkm/1.webp",
    description: row.description,
    slug: row.id,
    category: row.kategori?.name || "Lainnya",
    location: row.desa?.name || "Lainnya",
    recommended: row.is_recommended || false,
  }));

  return <CariUmkmView initialUmkm={mappedUmkm} />;
}
