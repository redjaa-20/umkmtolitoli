import type { Metadata } from "next";

import { MasukView } from "src/sections/masuk/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Masuk | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <MasukView />;
}
