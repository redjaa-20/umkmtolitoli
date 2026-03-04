import type { Metadata } from "next";

import { UsahaCreateView } from "src/sections/usaha/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Tambah Usaha | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <UsahaCreateView />;
}
