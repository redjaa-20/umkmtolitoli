import type { Metadata } from "next";

import { LupaKataSandiView } from "src/sections/lupa-kata-sandi/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Lupa Kata Sandi | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <LupaKataSandiView />;
}
