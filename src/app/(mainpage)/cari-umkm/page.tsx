import type { Metadata } from "next";

import { CariUmkmView } from "src/sections/cari-umkm/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Cari UMKM | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <CariUmkmView />;
}
