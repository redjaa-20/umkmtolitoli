"use client";

import { notFound } from "next/navigation";
import { useMemo } from "react";
import { umkm } from "src/const/umkm";
import { DetailUmkmCover } from "../detail-umkm-cover";
import { DetailUmkmInfo } from "../detail-umkm-info";
import { DetailUmkmActions } from "../detail-umkm-actions";

// ------------------------------------------------------------

interface DetailUmkmViewProps {
  params: {
    kecamatan: string;
    desa: string;
    kategori: string;
    slug: string;
  };
}

// ------------------------------------------------------------

export function DetailUmkmView({ params }: DetailUmkmViewProps) {
  const { slug, desa, kecamatan } = params;

  const umkmData = useMemo(
    () => umkm.find((item) => item.slug === slug),
    [slug],
  );

  if (!umkmData) return notFound();

  return (
    <>
      <section className="relative space-y-5 md:space-y-10">
        <DetailUmkmCover src={umkmData.image} alt={umkmData.name} />

        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-15 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 md:mr-10">
              <DetailUmkmInfo
                name={umkmData.name}
                category={umkmData.category}
                recommended={umkmData.recommended}
                desa={desa}
                kecamatan={kecamatan}
              />
            </div>
            <DetailUmkmActions />
          </div>
        </div>
      </section>
    </>
  );
}
