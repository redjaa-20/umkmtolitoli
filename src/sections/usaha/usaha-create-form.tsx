"use client";

import React from "react";
import { Form } from "src/components/form";
import { Button } from "src/components/ui/button";
import { Spinner } from "src/components/ui/spinner";
import { UsahaImageUpload } from "./usaha-image-upload";
import type {
  LocationGroup,
  CategoryOption,
  CreateBusinessFormValues,
} from "./types";
import type { UseFormReturn } from "react-hook-form";

// ------------------------------------------------------------

type UsahaCreateFormProps = {
  methods: UseFormReturn<CreateBusinessFormValues>;
  onSubmit: (data: CreateBusinessFormValues) => Promise<void>;
  isSubmitting: boolean;
  // image
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imagePreview: string | null;
  onImageClick: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  // data
  locations: LocationGroup[];
  categories: CategoryOption[];
  isLoadingLocations: boolean;
  isLoadingCategories: boolean;
};

// ------------------------------------------------------------

export function UsahaCreateForm({
  methods,
  onSubmit,
  isSubmitting,
  fileInputRef,
  imagePreview,
  onImageClick,
  onImageChange,
  onImageRemove,
  locations,
  categories,
  isLoadingLocations,
  isLoadingCategories,
}: UsahaCreateFormProps) {
  const locationItems = locations
    .sort((a, b) => a.kecamatan.localeCompare(b.kecamatan))
    .map((loc) => ({
      group: loc.kecamatan,
      items: loc.desa.map((d) => ({ value: d.id, label: d.name })),
    }));

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-5">
      <UsahaImageUpload
        imagePreview={imagePreview}
        fileInputRef={fileInputRef}
        onImageClick={onImageClick}
        onImageChange={onImageChange}
        onImageRemove={onImageRemove}
      />

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
        placeholder={
          isLoadingCategories ? "Memuat kategori..." : "Pilih kategori usaha"
        }
        disabled={isLoadingCategories}
        items={categories}
      />

      <Form.Select
        name="business_location"
        label="Lokasi Usaha"
        placeholder={
          isLoadingLocations ? "Memuat lokasi..." : "Pilih lokasi usaha"
        }
        disabled={isLoadingLocations}
        items={locationItems}
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
  );
}
