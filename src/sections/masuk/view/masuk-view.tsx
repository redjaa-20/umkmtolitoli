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
import { useRouter } from "next/navigation";

// ------------------------------------------------------------

const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, "Masukkan alamat email"),
  password: z
    .string()
    .min(1, "Masukkan kata sandi")
    .min(8, "Kata sandi minimal berisi 8 karakter"),
});

const GoogleIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48px"
    height="48px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.641-3.337-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.233,4.14-4.082,5.421l6.19,5.238C39.924,34.411,44,28.718,44,20C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

// ------------------------------------------------------------

export function MasukView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  type FormValues = z.infer<typeof SignInSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
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
      router.push(paths.dashboard.root);
    } catch (err) {
      console.error(err);
      // showToast("Gagal mengirim kode. Silakan coba lagi.", "error");
    }
  };

  return (
    <section className="h-full flex flex-col">
      <div className="h-20 flex items-center justify-between px-5">
        <Link href={paths.mainpage.root}>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">UMKM Tolitoli</span>
          </div>
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
      <div className="flex-1 flex items-center justify-center px-5 md:px-15">
        <div className="w-full space-y-5">
          <h1 className="text-xl font-semibold">Masuk</h1>
          <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
            <Form.Input
              name="email"
              label="Alamat Email"
              type="email"
              placeholder="john@example.com"
              autoFocus
              autoComplete="off"
            />
            <Form.InputGroup
              name="password"
              label={
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold">Kata Sandi</span>
                  <Link
                    href={paths.auth.forgotPassword}
                    className="font-normal text-sm text-muted-foreground"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
              }
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
                "Masuk Sekarang"
              )}
            </Button>
          </Form>
          <Button variant="outline" className="w-full h-11">
            <GoogleIcon />
            Masuk dengan Google
          </Button>
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
