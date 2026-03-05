"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ------------------------------------------------------------

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, "Masukkan alamat email"),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

// ------------------------------------------------------------

export function useLupaKataSandiForm() {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implement forgot password action
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    methods,
    isSubmitting,
    onSubmit,
  };
}
