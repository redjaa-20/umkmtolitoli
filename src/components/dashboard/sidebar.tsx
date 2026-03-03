import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { paths } from "src/routes/paths";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AutoConversationsIcon,
  BriefcaseDollarIcon,
  CafeIcon,
  Home04Icon,
} from "@hugeicons/core-free-icons";

// ------------------------------------------------------------

export function DashboardSidebar() {
  return (
    <aside className="hidden md:block w-75 shrink-0 sticky top-[100px] h-[calc(100dvh-120px)]">
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <Link href={paths.dashboard.root}>
                <Button className="w-full h-11 bg-green-500 justify-start gap-2">
                  <HugeiconsIcon
                    icon={Home04Icon}
                    className="size-4.5"
                    strokeWidth={2}
                  />
                  Dashboard
                </Button>
              </Link>
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full h-11 justify-start gap-2"
                >
                  <HugeiconsIcon
                    icon={BriefcaseDollarIcon}
                    className="size-4.5"
                  />
                  Usaha
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
