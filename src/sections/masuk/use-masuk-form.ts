"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { login } from "src/app/actions/auth";

// ------------------------------------------------------------

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, "Masukkan alamat email"),
  password: z
    .string()
    .min(1, "Masukkan kata sandi")
    .min(8, "Kata sandi minimal berisi 8 karakter"),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

// ------------------------------------------------------------

export function useMasukForm() {
  const router = useRouter();

  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormValues) => {
    setAuthError(null);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await login(formData);

      if (result?.error) {
        setAuthError(result.error);
      }
    } catch (err) {
      console.error(err);
      setAuthError("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return {
    methods,
    isSubmitting,
    showPassword,
    setShowPassword,
    authError,
    onSubmit,
  };
}
