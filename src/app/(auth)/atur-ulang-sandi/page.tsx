import type { Metadata } from "next";

import { AturUlangSandiView } from "src/sections/atur-ulang-sandi/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Atur Ulang Sandi | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <AturUlangSandiView />;
}
