"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Form } from "src/components/form";
import { Button } from "src/components/ui/button";
import { Spinner } from "src/components/ui/spinner";
import { locations } from "src/const/lokasi";
import { z } from "zod";
import {
  ArrowRight02Icon,
  Location01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Separator } from "src/components/ui/separator";

// ------------------------------------------------------------

const CreateBusinessSchema = z.object({
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

export function UsahaCreateView() {
  const defaultValues = {
    business_image: null,
    business_name: "",
    business_description: "",
    business_category: "",
    business_location: "",
    business_whatsapp: "",
    business_maps: "",
  };

  type FormValues = z.infer<typeof CreateBusinessSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("business_image", file as any);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

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
    <section className="flex flex-col gap-y-5 pb-5">
      <h1 className="text-xl font-semibold">Tambah Usaha</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Foto Usaha</label>
            <div
              onClick={handleDivClick}
              className="relative flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all data-[has-image=true]:border-transparent"
              data-has-image={!!imagePreview}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-primary">
                    Klik untuk upload foto
                  </span>
                  <span className="mt-1">PNG, JPG atau WEBP (max. 2MB)</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
            </div>
            {imagePreview && (
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                  setValue("business_image", null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                Hapus Foto
              </Button>
            )}
          </div>

          <Form.Input
            name="business_name"
            label="Nama Usaha"
            placeholder="Ayam Goreng Pak Budi"
            autoFocus
          />

          <Form.Textarea
            name="business_description"
            label="Deskripsi Usaha"
            placeholder="Deskripsi usaha Anda"
          />

          <Form.Select
            name="business_category"
            label="Kategori Usaha"
            placeholder="Pilih kategori usaha"
            items={[
              { value: "Makanan", label: "Makanan" },
              { value: "Minuman", label: "Minuman" },
              { value: "Pakaian", label: "Pakaian" },
              { value: "Kerajinan", label: "Kerajinan" },
            ]}
          />

          <Form.Select
            name="business_location"
            label="Lokasi Usaha"
            placeholder="Pilih lokasi usaha"
            items={[...locations]
              .sort((a, b) => a.kecamatan.localeCompare(b.kecamatan))
              .map((loc) => ({
                group: loc.kecamatan,
                items: loc.desa.map((d) => ({
                  value: d as string,
                  label: d as string,
                })),
              }))}
          />

          <Form.Input
            name="business_whatsapp"
            type="number"
            label="No. Whatsapp"
            placeholder="081234567890"
          />

          <Form.Input
            name="business_maps"
            label="Link Google Maps"
            placeholder="https://maps.google.com"
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
              "Buat Usaha"
            )}
          </Button>
        </Form>
        <div className="hidden lg:flex justify-end">
          <div className="w-[380px] h-[550px] 2xl:h-[650px] bg-primary fixed bottom-0 rounded-t-[3rem] px-2 pt-2 pb-0">
            <div className="h-full bg-background rounded-t-[2.5rem] overflow-hidden relative flex flex-col">
              <div className="w-full h-56 relative shrink-0 bg-muted/50 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-sm font-medium">
                    Foto Usaha
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto w-full px-5 py-6 pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <h2 className="text-xl font-bold wrap-break-word">
                  {methods.watch("business_name") || "Nama Usaha"}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Location01Icon} className="size-4" />
                    <p className="font-medium capitalize">
                      {(() => {
                        const locValue = methods.watch("business_location");
                        if (!locValue) return "Lokasi";
                        const locGroup = locations.find((l) =>
                          l.desa.includes(locValue),
                        );
                        return locGroup
                          ? `${locValue}, ${locGroup.kecamatan}`
                          : locValue;
                      })()}
                    </p>
                  </div>
                  {methods.watch("business_category") && (
                    <>
                      <span>&bull;</span>
                      <div>
                        <p className="font-medium capitalize">
                          {methods.watch("business_category")}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <Separator className="my-5 bg-transparent border-b border-dashed" />

                <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {methods.watch("business_description") ||
                    "Deskripsi usaha akan muncul di sini."}
                </p>
              </div>

              {/* Fake Mobile Bottom Bar */}
              <div className="absolute w-full h-[72px] bottom-0 inset-x-0 flex items-center justify-between bg-background/80 backdrop-blur-md px-4 gap-3">
                <Button
                  type="button"
                  className="h-11 flex-1 rounded-full text-sm font-semibold pointer-events-none"
                >
                  <span className="hidden sm:inline">Lihat di</span> Maps
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="size-5 ml-1 sm:ml-2"
                  />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  className="size-11 shrink-0 bg-green-500 hover:bg-green-600 border border-green-500 rounded-full text-white pointer-events-none"
                >
                  <HugeiconsIcon icon={WhatsappIcon} className="size-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
