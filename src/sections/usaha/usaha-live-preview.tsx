"use client";

import {
  ArrowRight02Icon,
  Location01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Separator } from "src/components/ui/separator";
import { Button } from "src/components/ui/button";
import type { LocationGroup, CategoryOption } from "./types";

// ------------------------------------------------------------

type UsahaLivePreviewProps = {
  imagePreview: string | null;
  businessName: string;
  businessDescription: string;
  locationId: string;
  categoryId: string;
  locations: LocationGroup[];
  categories: CategoryOption[];
};

// ------------------------------------------------------------

function resolveLocationLabel(
  locationId: string,
  locations: LocationGroup[],
): string {
  if (!locationId) return "Lokasi";
  for (const loc of locations) {
    const desa = loc.desa.find((d) => d.id === locationId);
    if (desa) return `${desa.name}, ${loc.kecamatan}`;
  }
  return "Lokasi";
}

function resolveCategoryLabel(
  categoryId: string,
  categories: CategoryOption[],
): string {
  const cat = categories.find((c) => c.value === categoryId);
  return cat ? cat.label : "";
}

// ------------------------------------------------------------

export function UsahaLivePreview({
  imagePreview,
  businessName,
  businessDescription,
  locationId,
  categoryId,
  locations,
  categories,
}: UsahaLivePreviewProps) {
  const locationLabel = resolveLocationLabel(locationId, locations);
  const categoryLabel = resolveCategoryLabel(categoryId, categories);

  return (
    <div className="hidden lg:flex justify-end">
      <div className="w-[380px] h-[550px] 2xl:h-[650px] bg-primary fixed bottom-0 rounded-t-[4.5rem] px-2 pt-2 pb-0">
        <div className="h-full bg-background rounded-t-[4rem] overflow-hidden relative flex flex-col">
          {/* Cover Image */}
          <div className="w-full h-56 relative shrink-0 bg-muted/50 flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-sm font-medium">
                Foto Usaha
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto w-full px-5 py-6 pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h2 className="text-xl font-bold wrap-break-word">
              {businessName || "Nama Usaha"}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-3 text-sm">
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Location01Icon} className="size-4" />
                <p className="font-medium capitalize">{locationLabel}</p>
              </div>

              {categoryLabel && (
                <>
                  <span>&bull;</span>
                  <p className="font-medium capitalize">{categoryLabel}</p>
                </>
              )}
            </div>

            <Separator className="my-5 bg-transparent border-b border-dashed" />

            <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {businessDescription || "Deskripsi usaha akan muncul di sini."}
            </p>
          </div>

          {/* Fake Mobile Bottom Bar */}
          <div className="absolute w-full h-[72px] bottom-0 inset-x-0 flex items-center justify-between bg-background/80 backdrop-blur-md px-4 gap-3">
            <Button
              type="button"
              className="h-11 flex-1 rounded-full text-sm font-semibold pointer-events-none"
            >
              <span className="hidden sm:inline">Lihat di</span> Maps
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                className="size-5 ml-1 sm:ml-2"
              />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-11 shrink-0 bg-green-500 hover:bg-green-600 border border-green-500 rounded-full text-white pointer-events-none"
            >
              <HugeiconsIcon icon={WhatsappIcon} className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
