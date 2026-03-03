import type { Metadata } from "next";

import { UsahaListView } from "src/sections/usaha/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Usaha | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <UsahaListView />;
}
