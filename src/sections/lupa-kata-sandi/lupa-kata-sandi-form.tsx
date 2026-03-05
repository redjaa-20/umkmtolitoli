"use client";

import Link from "next/link";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "src/components/ui/button";
import { Form } from "src/components/form";
import { Spinner } from "src/components/ui/spinner";
import { paths } from "src/routes/paths";
import type { ForgotPasswordFormValues } from "./use-lupa-kata-sandi-form";
import type { UseFormReturn } from "react-hook-form";

// ------------------------------------------------------------

type LupaKataSandiFormProps = {
  methods: UseFormReturn<ForgotPasswordFormValues>;
  onSubmit: (data: ForgotPasswordFormValues) => Promise<void>;
  isSubmitting: boolean;
};

// ------------------------------------------------------------

export function LupaKataSandiForm({
  methods,
  onSubmit,
  isSubmitting,
}: LupaKataSandiFormProps) {
  return (
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
  );
}
