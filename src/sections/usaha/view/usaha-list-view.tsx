import { createClient } from "src/lib/supabase/server";
import { UsahaCard } from "../usaha-card";
import { UsahaListToolbar } from "../usaha-list-toolbar";

// ------------------------------------------------------------

/** Supabase can return a joined relation as an object or array depending on key type. */
function getKategoriName(
  kategori?: { name: string } | { name: string }[] | null,
): string | null {
  if (!kategori) return null;
  if (Array.isArray(kategori)) return kategori[0]?.name ?? null;
  return kategori.name;
}

// ------------------------------------------------------------

export async function UsahaListView() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let umkm: {
    id: string;
    name: string;
    image_url?: string | null;
    kategori?: { name: string } | { name: string }[] | null;
  }[] = [];

  if (user) {
    const { data } = await supabase
      .from("usaha")
      .select(
        `
        id,
        name,
        image_url,
        kategori:kategori_id (name)
      `,
      )
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (data) umkm = data as any;
  }

  return (
    <section className="flex flex-col gap-y-5">
      <h1 className="text-xl font-semibold">List Usaha Anda</h1>
      <UsahaListToolbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {umkm.map((item) => (
          <UsahaCard
            key={item.id}
            name={item.name}
            imageUrl={item.image_url}
            kategoriName={getKategoriName(item.kategori)}
          />
        ))}
        {umkm.length === 0 && (
          <div className="col-span-full py-10 flex text-center flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
            <p className="text-sm">Anda belum mendaftarkan usaha apa pun.</p>
          </div>
        )}
      </div>
    </section>
  );
}
