import Image from "next/image";
import Link from "next/link";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent } from "src/components/ui/card";
import { locations } from "src/const/lokasi";

// ------------------------------------------------------------

type CariUmkmCardProps = {
  item: any;
};

// ------------------------------------------------------------

function resolveItemHref(item: any): string {
  let itemKecamatan = "unknown";
  let itemDesa = "unknown";

  for (const group of locations) {
    if (group.kecamatan === item.location) {
      itemKecamatan = group.kecamatan.toLowerCase().replace(/\s+/g, "-");
      itemDesa = "semua-desa";
      break;
    }
    if (group.desa.includes(item.location)) {
      itemKecamatan = group.kecamatan.toLowerCase().replace(/\s+/g, "-");
      itemDesa = item.location.toLowerCase().replace(/\s+/g, "-");
      break;
    }
  }

  const itemKategori = item.category.toLowerCase().replace(/\s+/g, "-");
  return `/umkm/${itemKecamatan}/${itemDesa}/${itemKategori}/${item.slug}`;
}

// ------------------------------------------------------------

export function CariUmkmCard({ item }: CariUmkmCardProps) {
  const href = resolveItemHref(item);

  return (
    <Link href={href} className="group">
      <Card className="py-0 ring-0">
        <CardContent className="flex flex-col gap-3 px-0">
          <div className="w-full aspect-4/3 md:aspect-14/9 relative overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.recommended && (
              <div className="absolute top-2 left-0">
                <span className="text-xs bg-linear-to-tr from-lime-500 to-green-500 text-white p-1 pr-2 md:p-1.5 md:pr-3 rounded-r-full">
                  Rekomendasi
                </span>
              </div>
            )}
          </div>
          <div className="px-1 space-y-1">
            <h3 className="font-medium line-clamp-1">{item.name}</h3>
            <div className="flex items-center gap-1">
              <HugeiconsIcon
                icon={Location01Icon}
                className="size-3 md:size-4 text-muted-foreground"
              />
              <p className="text-xs md:text-sm text-muted-foreground">
                {item.location}
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground capitalize">
              {item.category}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
