import {
  CheckmarkBadge02Icon,
  Location01Icon,
  Megaphone01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Card, CardContent } from "src/components/ui/card";
import { Separator } from "src/components/ui/separator";

// ------------------------------------------------------------

type DetailUmkmInfoProps = {
  name: string;
  category: string;
  description?: string;
  recommended?: boolean;
  desa: string;
  kecamatan: string;
};

// ------------------------------------------------------------

export function DetailUmkmInfo({
  name,
  category,
  description,
  recommended,
  desa,
  kecamatan,
}: DetailUmkmInfoProps) {
  const desaLabel = desa.replace(/-/g, " ");
  const kecamatanLabel = kecamatan.replace(/-/g, " ");

  return (
    <div className="space-y-6">
      {/* Name + Meta */}
      <div>
        <h2 className="text-xl md:text-3xl font-bold">{name}</h2>
        <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-3 md:mt-4">
          {recommended && (
            <>
              <span className="inline-flex items-center gap-1 pl-2 pr-3 py-1 bg-linear-to-tr from-lime-400 to-green-500 text-white text-xs md:text-sm font-medium rounded-full capitalize">
                <HugeiconsIcon
                  icon={CheckmarkBadge02Icon}
                  className="size-3.5 md:size-4"
                  strokeWidth={2}
                />
                Rekomendasi
              </span>
              <span>&bull;</span>
            </>
          )}
          <div className="flex items-center gap-1">
            <HugeiconsIcon
              icon={Location01Icon}
              className="size-3.5 md:size-4"
            />
            <p className="text-sm md:text-base font-medium capitalize">
              {desaLabel}, {kecamatanLabel}
            </p>
          </div>
          <span>&bull;</span>
          <p className="text-sm md:text-base font-medium capitalize">
            {category}
          </p>
        </div>
      </div>

      <Separator className="bg-transparent border-b border-dashed" />

      {/* Description */}
      <div>
        <p className="text-sm md:text-base leading-relaxed">
          {description || (
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              corporis voluptatem aliquid repellat voluptatibus minima alias,
              culpa veritatis, et laborum impedit, deleniti possimus fugit. Eius
              eligendi in doloremque hic necessitatibus.
            </>
          )}
        </p>
      </div>

      <Separator className="bg-transparent border-b border-dashed" />

      {/* Report card */}
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
              <HugeiconsIcon icon={Megaphone01Icon} className="size-4" />
              Laporkan
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
