import {
  Add01Icon,
  Location01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "src/components/ui/input-group";
import { umkm } from "src/const/umkm";
import { paths } from "src/routes/paths";

export function UsahaListView() {
  return (
    <section className="flex flex-col gap-y-5">
      <h1 className="text-xl font-semibold">List Usaha Anda</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <InputGroup className="flex-1 h-10 md:h-11 px-2">
          <InputGroupInput
            placeholder="Cari UMKM..."
            className="placeholder:text-sm"
          />
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} />
          </InputGroupAddon>
        </InputGroup>
        <Link href={paths.dashboard.business.create}>
          <Button className="h-10 md:h-11 bg-green-500 hover:bg-green-500/90 px-4">
            <HugeiconsIcon
              icon={Add01Icon}
              className="size-4.5"
              strokeWidth={2}
            />
            Tambah Baru
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {umkm.map((item, index) => (
          <Card key={index} className="py-2">
            <CardContent className="flex flex-col gap-3 px-2">
              <div className="w-full aspect-14/9 relative overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt="{item.name}"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-1 space-y-1">
                <h3 className="font-medium line-clamp-1">{item.name}</h3>
                {/* <div className="flex items-center gap-1">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    className="size-3 md:size-4 text-muted-foreground"
                  />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {item.location}
                  </p>
                </div> */}
                <p className="text-xs md:text-sm text-muted-foreground capitalize">
                  {item.category}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
