"use client";

import { useState, useEffect, useRef } from "react";
import { paths } from "src/routes/paths";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BriefcaseDollarIcon,
  Home04Icon,
  LogoutSquare01Icon,
  Menu01Icon,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { navMenu } from "./menu";
import Link from "next/link";
import { createClient } from "src/lib/supabase/client";
import { logout } from "src/app/actions/auth";
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
import type { User } from "@supabase/supabase-js";

// ------------------------------------------------------------

export function MainHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
          {!isLoading &&
            (!user ? (
              <>
                <Link
                  href={paths.auth.login}
                  className="hidden md:block text-sm"
                >
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
                            src={user?.user_metadata?.avatar_url || ""}
                            alt={
                              user?.user_metadata?.full_name ||
                              user?.email ||
                              "User"
                            }
                          />
                          <AvatarFallback className="bg-green-500 text-white">
                            {(
                              user?.user_metadata?.full_name ||
                              user?.email ||
                              "U"
                            )
                              .substring(0, 1)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    }
                  ></DropdownMenuTrigger>
                  <DropdownMenuContent className="w-50">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <p className="text-sm font-semibold">
                          {user?.user_metadata?.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {user?.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="h-9 md:hidden">
                        <HugeiconsIcon icon={Home04Icon} />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem className="h-9 md:hidden">
                        <HugeiconsIcon icon={BriefcaseDollarIcon} />
                        Usaha
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="md:hidden" />
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="h-9"
                        onClick={async () => {
                          setIsLoading(true);
                          await logout();
                        }}
                      >
                        <HugeiconsIcon icon={LogoutSquare01Icon} />
                        Keluar
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
