import Image from "next/image";
import { Card, CardContent } from "src/components/ui/card";

// ------------------------------------------------------------

type UsahaCardProps = {
  name: string;
  imageUrl?: string | null;
  kategoriName?: string | null;
};

// ------------------------------------------------------------

export function UsahaCard({ name, imageUrl, kategoriName }: UsahaCardProps) {
  return (
    <Card className="py-2">
      <CardContent className="flex flex-col gap-3 px-2">
        <div className="w-full aspect-video relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Tidak ada foto
            </div>
          )}
        </div>
        <div className="px-1 space-y-1">
          <h3 className="font-medium line-clamp-1">{name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground capitalize">
            {kategoriName || "Tanpa Kategori"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
