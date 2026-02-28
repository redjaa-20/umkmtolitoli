import { MainFooter, MainHeader } from "src/components/mainpage";

// ------------------------------------------------------------

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full">
      <div className="min-h-dvh flex flex-col relative">
        <MainHeader />
        <main className="flex-1">{children}</main>
        <MainFooter />
      </div>
    </div>
  );
}
