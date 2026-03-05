"use client";

import Link from "next/link";
import { paths } from "src/routes/paths";
import { useAturUlangSandiForm } from "../use-atur-ulang-sandi-form";
import { AturUlangSandiForm } from "../atur-ulang-sandi-form";

// ------------------------------------------------------------

export function AturUlangSandiView() {
  const { methods, onSubmit, isSubmitting, showPassword, setShowPassword } =
    useAturUlangSandiForm();

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
        <AturUlangSandiForm
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          showPassword={showPassword}
          onTogglePassword={setShowPassword}
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
