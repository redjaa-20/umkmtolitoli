import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "src/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "src/components/ui/input-group";

export function UsahaListView() {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl font-semibold">List Usaha Anda</h1>
      <div className="flex items-center gap-3">
        <InputGroup className="flex-1 h-10 md:h-11 px-2">
          <InputGroupInput placeholder="Cari UMKM..." />
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} />
          </InputGroupAddon>
        </InputGroup>
        <Button className="h-10 md:h-11 bg-green-500 hover:bg-green-500/90 px-4">
          <HugeiconsIcon
            icon={Add01Icon}
            className="size-4.5"
            strokeWidth={2}
          />
          Tambah Baru
        </Button>
      </div>
    </div>
  );
}
