import type { Metadata } from "next";

import { DetailUmkmView } from "src/sections/detail-umkm/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

interface PageProps {
  params: Promise<{
    kecamatan: string;
    desa: string;
    kategori: string;
    slug: string;
  }>;
}

// ------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return <DetailUmkmView params={resolvedParams} />;
}
