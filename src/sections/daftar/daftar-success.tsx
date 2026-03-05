"use client";

import Link from "next/link";
import { Button } from "src/components/ui/button";
import { paths } from "src/routes/paths";
import { useRouter } from "next/navigation";

// ------------------------------------------------------------

export function DaftarSuccess() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-15 text-center space-y-4">
      <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold">Cek Email Anda</h1>
      <p className="text-muted-foreground max-w-sm">
        Tautan konfirmasi pendaftaran telah dikirim ke email yang Anda masukkan.
        Silakan periksa kotak masuk (atau folder spam) untuk menyelesaikan
        aktivasi akun.
      </p>
      <Button
        variant="outline"
        className="mt-6"
        onClick={() => router.push(paths.auth.login)}
      >
        Kembali ke Halaman Masuk
      </Button>
    </div>
  );
}
