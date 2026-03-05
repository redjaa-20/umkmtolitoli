"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ------------------------------------------------------------

export const ResetPasswordSchema = z
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

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

// ------------------------------------------------------------

export function useAturUlangSandiForm() {
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  const {
    formState: { isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implement reset password action
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    methods,
    isSubmitting,
    showPassword,
    setShowPassword,
    onSubmit,
  };
}
