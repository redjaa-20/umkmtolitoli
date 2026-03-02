"use client";

import { Separator } from "src/components/ui/separator";
import { navMenu } from "./menu";
import { usePathname } from "next/navigation";

// ------------------------------------------------------------

export function MainFooter() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const isUMKMDetail = segments.length === 5 && segments[0] === "umkm";
  const isCariUMKM = pathname === "/cari-umkm";

  if (isUMKMDetail || isCariUMKM) return null;

  return (
    <footer className="w-full max-w-[1440px] mx-auto p-4 md:p-6">
      <div className="flex flex-col bg-primary text-primary-foreground p-6 md:px-15 md:py-13 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 mb-10 md:mb-25">
          <div className="md:col-span-2 md:pr-50">
            <p className="text-sm leading-relaxed">
              UMKM Tolitoli merupakan platform direktori UMKM di Kabupaten
              Tolitoli. Kami menghubungkan masyarakat dengan pelaku usaha lokal
              melalui informasi yang jelas, rapi, dan mudah diakses.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <h5 className="text-neutral-400">Jalan Pintas</h5>
            <ul className="space-y-3">
              {navMenu.map((nav, index) => (
                <li key={index}>
                  <a href={nav.href}>{nav.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            <h5 className="text-neutral-400">Temukan Kami</h5>
            <ul className="space-y-3">
              <li>
                <a href="mailto:halo@umkmtolitoli.web.id">
                  halo@umkmtolitoli.web.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281234567890">+62 812 3456 7890</a>
              </li>
              <li>Tolitoli, Sulawesi Tengah</li>
            </ul>
          </div>
        </div>
        <Separator className="bg-neutral-700" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-5">
          <p className="text-sm text-neutral-400">
            © 2026 UMKM Tolitoli. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <p className="text-sm">Privacy Policy</p>
            <p className="text-sm">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
