import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent } from "src/components/ui/card";
import type { IconSvgElement } from "@hugeicons/react";

// ------------------------------------------------------------

type DashboardStatCardProps = {
  label: string;
  value: string | number;
  icon: IconSvgElement;
};

// ------------------------------------------------------------

export function DashboardStatCard({
  label,
  value,
  icon,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <div className="bg-green-500 text-white p-2 rounded-full">
            <HugeiconsIcon icon={icon} className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
