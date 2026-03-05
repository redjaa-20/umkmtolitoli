import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";

// ------------------------------------------------------------

export function DashboardPromoBanner() {
  return (
    <Card className="bg-linear-to-b md:bg-linear-to-r from-green-500 to-green-100 overflow-hidden pt-6 md:pt-10 pb-0">
      <CardContent className="px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-6 md:gap-0">
          <div className="text-white text-center md:text-left pb-6 md:pb-10 self-center">
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              Ingin Usaha Anda Tampil di Halaman Depan?
            </h2>
            <p className="leading-relaxed mb-5">
              Dapatkan badge <span className="font-semibold">Rekomendasi</span>{" "}
              agar usaha Anda bisa tampil dihalaman depan dan lebih cepat
              ditemukan customer.
            </p>
            <Button variant="secondary" className="h-10 px-4">
              Dapatkan Badge Rekomendasi
            </Button>
          </div>
          <div className="flex items-end justify-center md:justify-end">
            <Image
              src="/assets/images/dashboard/recommend.webp"
              alt="Recommend Badge"
              width={1446}
              height={1500}
              priority
              className="h-60 md:h-70 w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
