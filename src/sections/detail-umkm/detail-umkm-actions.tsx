import {
  ArrowRight02Icon,
  Location01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";

// ------------------------------------------------------------

type DetailUmkmActionsProps = {
  /** Google Maps URL for this business */
  mapsUrl?: string;
  /** WhatsApp URL for this business */
  whatsappUrl?: string;
};

// ------------------------------------------------------------

export function DetailUmkmActions({
  mapsUrl = "#",
  whatsappUrl = "#",
}: DetailUmkmActionsProps) {
  return (
    <>
      {/* Desktop sticky sidebar */}
      <div className="hidden md:block">
        <Card className="w-full sticky top-10">
          <CardContent>
            <div className="flex flex-col gap-2 w-full">
              <Link href={whatsappUrl} className="w-full">
                <Button className="h-11 w-full bg-green-500 hover:bg-green-500/90 rounded-full">
                  <HugeiconsIcon icon={WhatsappIcon} className="size-5 mr-2" />
                  Chat via Whatsapp
                </Button>
              </Link>
              <Link href={mapsUrl} className="w-full">
                <Button className="h-11 w-full rounded-full">
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

      {/* Mobile fixed bottom bar */}
      <div className="md:hidden w-full h-16 fixed bottom-0 inset-x-0 flex items-center bg-background px-3">
        <div className="flex items-center gap-2 w-full">
          <Link href={mapsUrl} className="flex-1">
            <Button className="h-12 w-full rounded-full">
              Lihat Lokasi di Maps
              <HugeiconsIcon icon={ArrowRight02Icon} className="size-5" />
            </Button>
          </Link>
          <Link href={whatsappUrl}>
            <Button size="icon" className="size-12 bg-green-500 rounded-full">
              <HugeiconsIcon icon={WhatsappIcon} className="size-6" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
