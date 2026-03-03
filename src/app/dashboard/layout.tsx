import { DashboardSidebar } from "src/components/dashboard";
import { MainHeader } from "src/components/mainpage";

// ------------------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full">
      <div className="min-h-dvh flex flex-col relative">
        <MainHeader />
        <main className="flex-1 py-5">
          <div className="relative">
            <div className="w-full max-w-[1440px] mx-auto flex gap-20 px-4 md:px-6">
              <DashboardSidebar />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
