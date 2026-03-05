import type { Metadata } from "next";

import { DashboardView } from "src/sections/dashboard/view";

// ------------------------------------------------------------

import { createClient } from "src/lib/supabase/server";

export const metadata: Metadata = {
  title: `Dashboard | UMKM Tolitoli`,
  description: "",
};

// ------------------------------------------------------------

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("users")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    profile = data;
  }

  let totalUsers = 0;

  if (profile?.role === "admin") {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    totalUsers = count || 0;
  }

  return (
    <DashboardView profile={profile} user={user} totalUsers={totalUsers} />
  );
}
