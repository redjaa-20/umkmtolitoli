"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "src/components/form";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { Spinner } from "src/components/ui/spinner";
import { paths } from "src/routes/paths";

// ------------------------------------------------------------

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, "Masukkan alamat email"),
});

// ------------------------------------------------------------

export function LupaKataSandiView() {
  const defaultValues = {
    email: "",
  };

  type FormValues = z.infer<typeof ForgotPasswordSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // showToast("Berhasil masuk", "success");
      // router.push(paths.dashboard.root);
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      // showToast("Gagal mengirim kode. Silakan coba lagi.", "error");
    }
  };

  return (
    <section className="h-full flex flex-col">
      <div className="h-20 flex items-center px-5">
        <Link href={paths.mainpage.root}>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">UMKM Tolitoli</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-5 md:px-15">
        <div className="w-full space-y-5">
          <h1 className="text-xl font-semibold">Lupa Kata Sandi</h1>
          <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
            <Form.Input
              name="email"
              label="Alamat Email"
              type="email"
              placeholder="john@example.com"
              autoFocus
              autoComplete="off"
            />

            <Button
              type="submit"
              className="w-full h-11 bg-green-500 hover:bg-green-500/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner /> Mohon tunggu
                </>
              ) : (
                "Kirim Kode Reset"
              )}
            </Button>
          </Form>
          {/* <Link href={paths.auth.login}>
            <Button variant="outline" className="w-full h-11">
              <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4.5" />
              Kembali ke Halaman Masuk
            </Button>
          </Link> */}
          <div className="flex items-center justify-center">
            <Link
              href={paths.auth.login}
              className="flex items-center text-sm gap-2"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4.5" />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <span className="text-sm text-muted-foreground">
          © 2026 UMKM Tolitoli. All rights reserved.
        </span>
      </div>
    </section>
  );
}
