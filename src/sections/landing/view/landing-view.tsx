"use client";

import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "src/components/ui/carousel";
import { umkm } from "src/const/umkm";
import { paths } from "src/routes/paths";

// ------------------------------------------------------------

function CarouselPrevButton() {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      variant="outline"
      className="size-10 rounded-full"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
    >
      <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5" />
    </Button>
  );
}

function CarouselNextButton() {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      variant="outline"
      className="size-10 rounded-full"
      onClick={scrollNext}
      disabled={!canScrollNext}
    >
      <HugeiconsIcon icon={ArrowRight02Icon} className="size-5" />
    </Button>
  );
}

function CarouselDots() {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  const onInit = useCallback((api: CarouselApi) => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onInit(api);
    onSelect(api);
    api.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);

    return () => {
      api.off("reInit", onInit).off("reInit", onSelect).off("select", onSelect);
    };
  }, [api, onInit, onSelect]);

  return (
    <div className="flex items-center justify-center gap-2">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotButtonClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`h-2 rounded-full transition-all ${
            index === selectedIndex ? "w-6 bg-green-500" : "w-2 bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------

export function LandingView() {
  return (
    <div className="space-y-20">
      <section className="relative pt-15 md:pt-20">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4 md:px-6">
          <h1 className="text-3xl md:text-6xl font-medium text-center md:leading-[1.2]">
            Temukan{" "}
            <span className="text-green-500 font-semibold">UMKM Tolitoli</span>
            <br />
            dengan Mudah
          </h1>
          {/* <p className="max-w-3xl text-center text-muted-foreground leading-relaxed mt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum,
            voluptatum. Temporibus atque nisi explicabo odit excepturi eum quos,
            quaerat velit nemo debitis dolore officia esse suscipit omnis
            cupiditate vero perferendis?
          </p> */}
          <Link href={paths.mainpage.umkm}>
            <Button className="h-11 md:h-12 bg-green-500 hover:bg-green-500/90 rounded-full px-4 md:px-6 mt-8 hover:scale-105 transition-transform duration-300">
              Cari UMKM Sekarang
            </Button>
          </Link>
        </div>
      </section>
      {/* <section className="relative px-4 md:px-6">
        <div className="w-full max-w-[1440px] mx-auto h-60 md:h-100 relative overflow-hidden rounded-3xl">
          <Image
            src="/assets/images/1.webp"
            alt="Hero Image"
            fill
            className="object-cover"
          />
        </div>
      </section> */}
      <section className="w-full max-w-[1440px] mx-auto relative md:px-6">
        <div className="w-full h-65 md:h-100 relative overflow-hidden md:rounded-3xl">
          <Image
            src="/assets/images/1.webp"
            alt="Hero Image"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="flex items-center mb-5">
            <h2 className="text-xl md:text-3xl font-semibold">
              Rekomendasi UMKM Tolitoli
            </h2>
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <CarouselPrevButton />
              <CarouselNextButton />
            </div>
          </div>
          <CarouselContent>
            {umkm
              .filter((item) => item.recommended)
              .map((item, index) => (
                <CarouselItem key={index} className="basis-1/1 lg:basis-1/4">
                  <Link href={`/umkm/${item.slug}`} className="group">
                    <Card className="py-0 ring-0">
                      <CardContent className="flex flex-col gap-3 px-0">
                        <div className="w-full aspect-14/9 relative overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.recommended && (
                            <div className="absolute top-3 left-0">
                              <span className="text-xs bg-linear-to-tr from-lime-500 to-green-500 text-white p-1.5 pr-3 rounded-r-full">
                                Rekomendasi
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="px-1 space-y-1">
                          <h3 className="font-medium line-clamp-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon
                              icon={Location01Icon}
                              className="size-4 text-muted-foreground"
                            />
                            <p className="text-sm text-muted-foreground">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className="flex items-center justify-between md:justify-center mt-5">
            <CarouselDots />
            <div className="md:hidden flex items-center gap-3">
              <CarouselPrevButton />
              <CarouselNextButton />
            </div>
          </div>
        </Carousel>
      </section>
      <section className="w-full max-w-[1440px] mx-auto relative px-4 md:px-6">
        <div className="w-full bg-linear-to-tr from-lime-500 to-green-500 flex flex-col items-center justify-center rounded-2xl p-10 md:p-15">
          <h3 className="text-2xl md:text-5xl font-medium text-center md:leading-[1.2] tracking-tight">
            {/* Punya Usaha yang Ingin di Tampilkan? */}
            Anda Pemilik UMKM?
          </h3>
          <p className="text-sm md:text-base text-center leading-relaxed mt-5">
            Daftarkan UMKM Anda sekarang dan jangkau lebih banyak pelanggan
          </p>
          <Button className="h-12 px-6 mt-5 rounded-full">
            Daftar Gratis Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
}
