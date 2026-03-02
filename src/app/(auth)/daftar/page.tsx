import type { Metadata } from "next";

import { DaftarView } from "src/sections/daftar/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Daftar | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <DaftarView />;
}
