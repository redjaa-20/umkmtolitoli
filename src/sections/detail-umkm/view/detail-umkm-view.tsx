"use client";

import {
  ArrowRight02Icon,
  Location01Icon,
  Megaphone01Icon,
  Navigation02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { Separator } from "src/components/ui/separator";
import { umkm } from "src/const/umkm";

// ----------------------------------------------------------------------

interface DetailUmkmViewProps {
  params: {
    kecamatan: string;
    desa: string;
    kategori: string;
    slug: string;
  };
}

export function DetailUmkmView({ params }: DetailUmkmViewProps) {
  const { slug } = params;

  const umkmData = useMemo(
    () => umkm.find((item) => item.slug === slug),
    [slug],
  );

  if (!umkmData) {
    return notFound();
  }

  return (
    <>
      <section className="relative space-y-5 md:space-y-10">
        {/* <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6"> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-15 items-start">
            <div className="aspect-square md:aspect-4/3 relative overflow-hidden rounded-2xl bg-muted">
              <Image
                src={umkmData.image}
                alt={umkmData.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full capitalize mb-3">
                  {umkmData.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-semibold">
                  {umkmData.name}
                </h2>
                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <HugeiconsIcon icon={Location01Icon} />
                  <p className="font-medium text-black">
                    {params.desa}, Kecamatan {params.kecamatan}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-3">Deskripsi Usaha</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {umkmData.description}
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, a. Numquam magnam vel inventore aliquid, rem
                  voluptatem iusto voluptatum cum expedita asperiores unde
                  aspernatur facilis dicta in labore omnis ad id accusamus est.
                  Ipsa, aut perferendis accusamus odio placeat voluptatum ullam?
                  Fuga a distinctio excepturi veritatis dolorem illum hic est
                  rem vel commodi reiciendis, eaque in accusamus minima ipsum
                  nam!
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <Button className="h-12 bg-green-500 hover:bg-green-500/90 text-white rounded-full px-8 gap-2 w-full md:w-auto">
                  <HugeiconsIcon icon={Navigation02Icon} />
                  Arahkan Lokasi
                </Button>
              </div>
            </div>
          </div> */}
        <div className="w-full h-60 md:h-125 relative overflow-hidden">
          <Image
            src={umkmData.image}
            alt={umkmData.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 md:mr-10">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold">
                    {umkmData.name}
                  </h2>
                  {/* <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs md:text-sm font-medium rounded-full capitalize mb-3">
                    {umkmData.category}
                  </span> */}
                  <div className="flex items-center gap-2 text-muted-foreground mt-3 md:mt-4">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      className="size-4 md:size-5"
                    />
                    <p className="text-sm md:text-base font-medium text-muted-foreground capitalize">
                      {params.desa.replace(/-/g, " ")},{" "}
                      {params.kecamatan.replace(/-/g, " ")}
                    </p>
                  </div>
                </div>
                <Separator className="bg-transparent border-b border-dashed" />
                <div>
                  {/* <h3 className="text-sm md:text-lg font-medium mb-3">
                    Deskripsi Singkat
                  </h3> */}
                  <p className="text-sm md:text-base leading-relaxed">
                    {/* {umkmData.description} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur corporis voluptatem aliquid repellat voluptatibus
                    minima alias, culpa veritatis, et laborum impedit, deleniti
                    possimus fugit. Eius eligendi in doloremque hic
                    necessitatibus.
                  </p>
                </div>
                <Separator className="bg-transparent border-b border-dashed" />
                <Card>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Ada data yang kurang tepat atau usaha ini milik Anda?
                      </p>
                      <Link
                        href="https://wa.me/6282214487498/?text=Saya+ingin+melaporkan+sesuatu..."
                        className="flex items-center gap-1 text-xs text-muted-foreground font-medium underline underline-offset-2"
                      >
                        <HugeiconsIcon
                          icon={Megaphone01Icon}
                          className="size-4"
                        />
                        Laporkan
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="hidden md:block">
              <Card className="w-full sticky top-10 ring-0 shadow-[0_2px_40px_#0000000a,0_16px_40px_#0000000f] py-5">
                <CardContent className="px-5">
                  <div className="flex flex-col gap-2 w-full">
                    <Link href="#" className="w-full">
                      <Button className="h-11 w-full bg-green-500 hover:bg-green-500/90 rounded-full">
                        <HugeiconsIcon
                          icon={WhatsappIcon}
                          className="size-5 mr-2"
                        />
                        Chat via Whatsapp
                      </Button>
                    </Link>
                    <Link href="#" className="w-full">
                      <Button
                        variant="outline"
                        className="h-11 w-full rounded-full"
                      >
                        <HugeiconsIcon
                          icon={Location01Icon}
                          className="size-5 mr-2"
                        />
                        Lihat Lokasi di Maps
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="md:hidden w-full h-16 fixed bottom-0 inset-x-0 flex items-center bg-background px-3">
          <div className="flex items-center gap-2 w-full">
            <Link href="#" className="flex-1">
              <Button className="h-12 w-full rounded-full">
                Lihat Lokasi di Maps
                <HugeiconsIcon icon={ArrowRight02Icon} className="size-5" />
              </Button>
            </Link>
            <Link href="#">
              <Button size="icon" className="size-12 bg-green-500 rounded-full">
                <HugeiconsIcon icon={WhatsappIcon} className="size-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
