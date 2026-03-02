import Image from "next/image";
import { MainFooter, MainHeader } from "src/components/mainpage";

// ------------------------------------------------------------

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="size-full">
    //   <div className="min-h-dvh flex flex-col relative">
    //     <MainHeader />
    //     <main className="flex-1">{children}</main>
    //     <MainFooter />
    //   </div>
    // </div>
    <div className="size-full">
      <div className="min-h-dvh flex flex-col relative">
        {/* <MainHeader /> */}
        <main className="flex-1 flex">
          <div className="w-125">{children}</div>
          <div className="flex-1 hidden md:flex relative overflow-hidden">
            <Image
              src="/assets/images/auth/auth-bg.webp"
              alt="Auth Background"
              fill
              className="object-cover"
            />
          </div>
        </main>
        {/* <MainFooter /> */}
      </div>
    </div>
  );
}
