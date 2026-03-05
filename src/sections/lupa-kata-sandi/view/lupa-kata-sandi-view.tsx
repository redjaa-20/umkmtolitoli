"use client";

import Link from "next/link";
import { paths } from "src/routes/paths";
import { useLupaKataSandiForm } from "../use-lupa-kata-sandi-form";
import { LupaKataSandiForm } from "../lupa-kata-sandi-form";

// ------------------------------------------------------------

export function LupaKataSandiView() {
  const { methods, onSubmit, isSubmitting } = useLupaKataSandiForm();

  return (
    <section className="h-full flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center px-5">
        <Link href={paths.mainpage.root}>
          <span className="text-lg font-semibold">UMKM Tolitoli</span>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-5 md:px-15">
        <LupaKataSandiForm
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <span className="text-sm text-muted-foreground">
          © 2026 UMKM Tolitoli. All rights reserved.
        </span>
      </div>
    </section>
  );
}
