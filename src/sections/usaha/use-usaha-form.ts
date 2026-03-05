"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import { createClient } from "src/lib/supabase/client";
import { createUsaha } from "src/app/actions/usaha";
import {
  CreateBusinessSchema,
  type CreateBusinessFormValues,
  type CategoryOption,
  type LocationGroup,
} from "./types";

// ------------------------------------------------------------

const DEFAULT_VALUES: CreateBusinessFormValues = {
  business_image: null,
  business_name: "",
  business_description: "",
  business_category: "",
  business_location: "",
  business_whatsapp: "",
  business_maps: "",
};

// ------------------------------------------------------------

export function useUsahaForm() {
  const router = useRouter();

  const methods = useForm<CreateBusinessFormValues>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    setValue,
    formState: { isSubmitting },
  } = methods;

  // ── Image upload ──────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("business_image", file as any);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setValue("business_image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // ── Locations ─────────────────────────────────────────────
  const [locations, setLocations] = useState<LocationGroup[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // ── Categories ────────────────────────────────────────────
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // ── Data fetching ─────────────────────────────────────────
  React.useEffect(() => {
    async function fetchLocations() {
      const supabase = createClient();
      const { data, error } = await supabase.from("kecamatan").select(`
          name,
          desa (
            id,
            name
          )
        `);

      if (!error && data) {
        setLocations(
          data.map((kec) => ({
            kecamatan: kec.name,
            desa: kec.desa.map((d: any) => ({ id: d.id, name: d.name })),
          })),
        );
      } else {
        console.error("Failed to fetch locations:", error);
      }
      setIsLoadingLocations(false);
    }

    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("kategori")
        .select("id, name")
        .order("name");

      if (!error && data) {
        setCategories(data.map((cat) => ({ value: cat.id, label: cat.name })));
      } else {
        console.error("Failed to fetch categories:", error);
      }
      setIsLoadingCategories(false);
    }

    fetchLocations();
    fetchCategories();
  }, []);

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (data: CreateBusinessFormValues) => {
    try {
      const formData = new FormData();
      formData.append("business_name", data.business_name || "");
      formData.append("business_description", data.business_description || "");
      formData.append("business_category", data.business_category || "");
      formData.append("business_location", data.business_location || "");
      formData.append("business_whatsapp", data.business_whatsapp || "");
      formData.append("business_maps", data.business_maps || "");

      if (data.business_image && data.business_image instanceof File) {
        formData.append("business_image", data.business_image);
      }

      const res = await createUsaha(formData);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Usaha berhasil didaftarkan!");
      router.push("/dashboard/usaha");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem yang tidak diketahui.");
    }
  };

  return {
    methods,
    isSubmitting,
    // image
    fileInputRef,
    imagePreview,
    handleImageChange,
    handleImageRemove,
    handleImageClick,
    // data
    locations,
    categories,
    isLoadingLocations,
    isLoadingCategories,
    // submit
    onSubmit,
  };
}
