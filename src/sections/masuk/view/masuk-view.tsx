"use client";

import Link from "next/link";
import { paths } from "src/routes/paths";
import { useMasukForm } from "../use-masuk-form";
import { MasukForm } from "../masuk-form";

// ------------------------------------------------------------

export function MasukView() {
  const {
    methods,
    onSubmit,
    isSubmitting,
    showPassword,
    setShowPassword,
    authError,
  } = useMasukForm();

  return (
    <section className="h-full flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-5">
        <Link href={paths.mainpage.root}>
          <span className="text-lg font-semibold">UMKM Tolitoli</span>
        </Link>
        <span className="text-sm">
          Belum punya akun?{" "}
          <Link
            href={paths.auth.register}
            className="font-medium text-green-500"
          >
            Daftar
          </Link>
        </span>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-5 md:px-15">
        <MasukForm
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          showPassword={showPassword}
          onTogglePassword={setShowPassword}
          authError={authError}
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
