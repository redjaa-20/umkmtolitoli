"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register } from "src/app/actions/auth";

// ------------------------------------------------------------

export const SignUpSchema = z.object({
  full_name: z
    .string()
    .min(1, "Masukkan nama lengkap")
    .min(3, "Nama tidak boleh kurang dari 3 karakter"),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, "Masukkan alamat email"),
  password: z
    .string()
    .min(1, "Masukkan kata sandi")
    .min(8, "Kata sandi minimal berisi 8 karakter"),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

// ------------------------------------------------------------

export function useDaftarForm() {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    setAuthError(null);
    try {
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await register(formData);

      if (result?.error) {
        setAuthError(result.error);
      } else {
        setIsSuccess(true);
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
    isSuccess,
    onSubmit,
  };
}
