import {
  BriefcaseDollarIcon,
  Edit03Icon,
  Notification01Icon,
  Store03Icon,
  UserMultipleIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { paths } from "src/routes/paths";

export function DashboardView() {
  return (
    <section className="relative space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
        {/* <Link href={paths.dashboard.businessData}>
            <Button className="h-10 bg-green-500 hover:bg-green-500/90 px-4">
              <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
              Ubah Data Usaha
            </Button>
          </Link> */}
      </div>
      <Card className="bg-linear-to-b md:bg-linear-to-r from-green-500 to-green-100 overflow-hidden pt-6 md:pt-10 pb-0">
        <CardContent className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-6 md:gap-0">
            <div className="text-white text-center md:text-left pb-6 md:pb-10 self-center">
              <h1 className="text-lg md:text-xl font-semibold mb-3">
                Ingin Usaha Anda Tampil di Halaman Depan?
              </h1>
              <p className="leading-relaxed mb-5">
                Dapatkan badge{" "}
                <span className="font-semibold">Rekomendasi</span> agar usaha
                Anda bisa tampil dihalaman depan dan lebih cepat ditemukan
                customer.
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Jumlah Usaha
                </p>
                <p className="text-2xl font-semibold">1</p>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-full">
                <HugeiconsIcon icon={Store03Icon} className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Jumlah Pengunjung
                </p>
                <p className="text-2xl font-semibold">100</p>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-full">
                <HugeiconsIcon icon={UserMultipleIcon} className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Jumlah Klik Whatsapp
                </p>
                <p className="text-2xl font-semibold">10</p>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-full">
                <HugeiconsIcon icon={WhatsappIcon} className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
