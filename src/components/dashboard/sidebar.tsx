"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const NAV_ITEMS = [
  {
    title: "Dashboard",
    path: paths.dashboard.root,
    icon: Home04Icon,
  },
  {
    title: "Usaha",
    path: paths.dashboard.business.root,
    icon: BriefcaseDollarIcon,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-70 shrink-0 sticky top-16 h-[calc(100dvh-120px)]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === paths.dashboard.root
                ? pathname === item.path
                : pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

            return (
              <Link key={item.title} href={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full h-11 justify-start gap-2 ${
                    isActive
                      ? "bg-green-500 hover:bg-green-500/90 text-white"
                      : ""
                  }`}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    className="size-4.5"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
