"use client";

import Link from "next/link";
import { paths } from "src/routes/paths";
import { useDaftarForm } from "../use-daftar-form";
import { DaftarForm } from "../daftar-form";
import { DaftarSuccess } from "../daftar-success";

// ------------------------------------------------------------

export function DaftarView() {
  const {
    methods,
    onSubmit,
    isSubmitting,
    showPassword,
    setShowPassword,
    authError,
    isSuccess,
  } = useDaftarForm();

  return (
    <section className="h-full flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-5">
        <Link href={paths.mainpage.root}>
          <span className="text-lg font-semibold">UMKM Tolitoli</span>
        </Link>
        {!isSuccess && (
          <span className="text-sm">
            Punya akun?{" "}
            <Link
              href={paths.auth.login}
              className="font-medium text-green-500"
            >
              Masuk
            </Link>
          </span>
        )}
      </div>

      {/* Content */}
      {isSuccess ? (
        <DaftarSuccess />
      ) : (
        <div className="flex-1 flex items-center justify-center px-5 md:px-15">
          <DaftarForm
            methods={methods}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            onTogglePassword={setShowPassword}
            authError={authError}
          />
        </div>
      )}

      {/* Footer */}
      {!isSuccess && (
        <div className="py-4 text-center">
          <span className="text-sm text-muted-foreground">
            © 2026 UMKM Tolitoli. All rights reserved.
          </span>
        </div>
      )}
    </section>
  );
}
