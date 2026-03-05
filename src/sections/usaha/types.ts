import { z } from "zod";

// ------------------------------------------------------------
// Schema
// ------------------------------------------------------------

export const CreateBusinessSchema = z.object({
  business_name: z
    .string()
    .min(1, "Masukkan nama usaha")
    .min(5, "Nama usaha minimal 5 karakter"),
  business_description: z
    .string()
    .min(1, "Masukkan deskripsi usaha")
    .min(80, "Deskripsi usaha minimal berisi 80 karakter"),
  business_category: z.string().min(1, "Pilih kategori usaha"),
  business_location: z.string().min(1, "Pilih lokasi usaha"),
  business_whatsapp: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit")
    .max(15, "Nomor WhatsApp maksimal 15 digit"),
  business_maps: z
    .string()
    .url("Link Google Maps tidak valid")
    .or(z.literal("")),
  business_image: z.any().optional(),
});

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

export type CreateBusinessFormValues = z.infer<typeof CreateBusinessSchema>;

export type LocationGroup = {
  kecamatan: string;
  desa: { id: string; name: string }[];
};

export type CategoryOption = {
  value: string;
  label: string;
};
