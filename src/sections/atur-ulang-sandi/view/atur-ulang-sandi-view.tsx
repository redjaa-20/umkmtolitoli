"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "src/components/form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { Spinner } from "src/components/ui/spinner";
import { paths } from "src/routes/paths";

// ------------------------------------------------------------

const ForgotPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Masukkan kata sandi")
      .min(8, "Kata sandi minimal berisi 8 karakter"),
    confirmNewPassword: z
      .string()
      .min(1, "Masukkan konfirmasi kata sandi")
      .min(8, "Konfirmasi kata sandi minimal berisi 8 karakter"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Kata sandi baru tidak sesuai",
    path: ["confirmNewPassword"],
  });

// ------------------------------------------------------------

export function AturUlangSandiView() {
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    newPassword: "",
    confirmNewPassword: "",
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
          <h1 className="text-xl font-semibold">Atur Ulang Kata Sandi</h1>
          <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
            <Form.InputGroup
              name="newPassword"
              label="Kata Sandi Baru"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="off"
              endAddon={
                showPassword ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(false)}
                  >
                    <HugeiconsIcon icon={ViewOffIcon} className="size-5" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(true)}
                  >
                    <HugeiconsIcon icon={ViewIcon} className="size-5" />
                  </Button>
                )
              }
            />

            <Form.InputGroup
              name="confirmNewPassword"
              label="Konfirmasi Kata Sandi Baru"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="off"
              endAddon={
                showPassword ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(false)}
                  >
                    <HugeiconsIcon icon={ViewOffIcon} className="size-5" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(true)}
                  >
                    <HugeiconsIcon icon={ViewIcon} className="size-5" />
                  </Button>
                )
              }
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
                "Simpan Perubahan"
              )}
            </Button>
          </Form>
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
