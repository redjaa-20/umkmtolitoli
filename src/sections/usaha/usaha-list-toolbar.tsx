import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "src/components/ui/input-group";
import { paths } from "src/routes/paths";

// ------------------------------------------------------------

export function UsahaListToolbar() {
  return (
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
  );
}
