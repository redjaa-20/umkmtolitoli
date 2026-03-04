import type { Metadata } from "next";

import { UsahaEditView } from "src/sections/usaha/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Ubah Data Usaha | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <UsahaEditView />;
}
