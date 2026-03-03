import type { Metadata } from "next";

import { DashboardView } from "src/sections/dashboard/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Dashboard | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default function Page() {
  return <DashboardView />;
}
