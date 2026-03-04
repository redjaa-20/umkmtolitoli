"use client";

import { useState, useEffect, useRef } from "react";
import { paths } from "src/routes/paths";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Notification01Icon } from "@hugeicons/core-free-icons";
import { navMenu } from "./menu";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// ------------------------------------------------------------

export function MainHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const loginState = true;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background transition-transform duration-300",
        !isVisible && "-translate-y-full",
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto h-16 flex items-center justify-between pl-3 pr-4 md:px-6">
        <div className="flex items-center">
          <Button size="icon" variant="ghost" className="md:hidden mr-1.5">
            <HugeiconsIcon icon={Menu01Icon} className="size-6.5" />
          </Button>
          <Link href={paths.mainpage.root}>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">UMKM Tolitoli</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 ml-10">
            {navMenu.map((nav, index) => (
              <a key={index} href={nav.href} className="text-sm">
                {nav.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {loginState !== true ? (
            <>
              <Link href={paths.auth.login} className="hidden md:block text-sm">
                Masuk
              </Link>
              <Link href={paths.auth.register}>
                <Button
                  variant="secondary"
                  className="h-10 bg-green-500 hover:bg-green-500/90 text-white px-4 md:px-6"
                >
                  Daftar
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="md:size-10 rounded-full"
              >
                <HugeiconsIcon
                  icon={Notification01Icon}
                  className="size-4.5 md:size-5"
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar className="md:size-9">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="shadcn"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                ></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {/* <Button
            size="lg"
            className="bg-indigo-500 hover:bg-indigo-500/90 px-4"
          >
            Masuk
          </Button>
          <Button size="lg" className="px-4" variant="outline">
            Daftar
          </Button> */}
        </div>
      </div>
    </header>
  );
}
