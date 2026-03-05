"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "src/lib/supabase/server";

export async function createUsaha(formData: FormData) {
  const supabase = await createClient();

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Anda harus login terlebih dahulu." };
  }

  // 2. Get user role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 3. Check business limit (1 for regular users)
  if (!isAdmin) {
    const { count, error: countError } = await supabase
      .from("usaha")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", user.id);

    if (countError) {
      console.error("Error checking business limit:", countError);
      return { error: "Gagal memverifikasi limit usaha." };
    }

    if (count !== null && count >= 1) {
      return { error: "Anda hanya dapat mendaftarkan maksimal 1 usaha." };
    }
  }

  // 4. Handle Image Upload
  const imageFile = formData.get("business_image") as File | null;
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    // Generate a unique file name
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("umkm_images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { error: "Gagal mengunggah foto usaha." };
    }

    // Get the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("umkm_images")
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
  }

  // 5. Insert data into 'usaha' table
  const usahaData = {
    owner_id: user.id,
    name: formData.get("business_name") as string,
    description: formData.get("business_description") as string,
    kategori_id: formData.get("business_category") as string,
    desa_id: formData.get("business_location") as string,
    whatsapp: formData.get("business_whatsapp") as string,
    maps_url: (formData.get("business_maps") as string) || null,
    image_url: imageUrl,
  };

  const { error: insertError } = await supabase
    .from("usaha")
    .insert([usahaData]);

  if (insertError) {
    console.error("Error inserting usaha:", insertError);
    return { error: "Terjadi kesalahan saat menyimpan data usaha." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
