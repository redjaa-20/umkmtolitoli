"use client";

import { Button } from "src/components/ui/button";
import { Form } from "src/components/form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { Spinner } from "src/components/ui/spinner";
import type { ResetPasswordFormValues } from "./use-atur-ulang-sandi-form";
import type { UseFormReturn } from "react-hook-form";

// ------------------------------------------------------------

type AturUlangSandiFormProps = {
  methods: UseFormReturn<ResetPasswordFormValues>;
  onSubmit: (data: ResetPasswordFormValues) => Promise<void>;
  isSubmitting: boolean;
  showPassword: boolean;
  onTogglePassword: (value: boolean) => void;
};

// ------------------------------------------------------------

function PasswordToggleButton({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <Button
      size="icon"
      variant="ghost"
      type="button"
      onClick={() => onToggle(!show)}
    >
      <HugeiconsIcon icon={show ? ViewOffIcon : ViewIcon} className="size-5" />
    </Button>
  );
}

// ------------------------------------------------------------

export function AturUlangSandiForm({
  methods,
  onSubmit,
  isSubmitting,
  showPassword,
  onTogglePassword,
}: AturUlangSandiFormProps) {
  const passwordToggle = (
    <PasswordToggleButton show={showPassword} onToggle={onTogglePassword} />
  );

  return (
    <div className="w-full space-y-5">
      <h1 className="text-xl font-semibold">Atur Ulang Kata Sandi</h1>

      <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
        <Form.InputGroup
          name="newPassword"
          label="Kata Sandi Baru"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="off"
          endAddon={passwordToggle}
        />

        <Form.InputGroup
          name="confirmNewPassword"
          label="Konfirmasi Kata Sandi Baru"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="off"
          endAddon={passwordToggle}
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
  );
}
