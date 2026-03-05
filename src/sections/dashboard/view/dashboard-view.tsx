import {
  Store03Icon,
  UserMultipleIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import type { User } from "@supabase/supabase-js";
import { DashboardPromoBanner } from "../dashboard-promo-banner";
import { DashboardStatCard } from "../dashboard-stat-card";

// ------------------------------------------------------------

interface DashboardViewProps {
  user: User | null;
  profile: any | null;
  totalUsers?: number;
}

// ------------------------------------------------------------

export function DashboardView({
  user,
  profile,
  totalUsers = 0,
}: DashboardViewProps) {
  const displayName =
    profile?.full_name || user?.email?.split("@")[0] || "User";
  const isAdmin = profile?.role === "admin";

  return (
    <section className="relative space-y-5">
      <h1 className="text-xl md:text-2xl font-semibold">
        Selamat datang, {displayName}
      </h1>

      {!isAdmin && <DashboardPromoBanner />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
        <DashboardStatCard label="Jumlah Usaha" value={1} icon={Store03Icon} />
        {isAdmin ? (
          <DashboardStatCard
            label="Jumlah Pengguna"
            value={totalUsers}
            icon={UserMultipleIcon}
          />
        ) : (
          <>
            <DashboardStatCard
              label="Jumlah Pengunjung"
              value={100}
              icon={UserMultipleIcon}
            />
            <DashboardStatCard
              label="Jumlah Klik Whatsapp"
              value={10}
              icon={WhatsappIcon}
            />
          </>
        )}
      </div>
    </section>
  );
}
