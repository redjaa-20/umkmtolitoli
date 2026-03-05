"use client";

import { useUsahaForm } from "../use-usaha-form";
import { UsahaCreateForm } from "../usaha-create-form";
import { UsahaLivePreview } from "../usaha-live-preview";

// ------------------------------------------------------------

export function UsahaCreateView() {
  const {
    methods,
    onSubmit,
    isSubmitting,
    fileInputRef,
    imagePreview,
    handleImageClick,
    handleImageChange,
    handleImageRemove,
    locations,
    categories,
    isLoadingLocations,
    isLoadingCategories,
  } = useUsahaForm();

  return (
    <section className="flex flex-col gap-y-5 pb-5">
      <h1 className="text-xl font-semibold">Tambah Usaha</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <UsahaCreateForm
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          fileInputRef={fileInputRef}
          imagePreview={imagePreview}
          onImageClick={handleImageClick}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
          locations={locations}
          categories={categories}
          isLoadingLocations={isLoadingLocations}
          isLoadingCategories={isLoadingCategories}
        />
        <UsahaLivePreview
          imagePreview={imagePreview}
          businessName={methods.watch("business_name")}
          businessDescription={methods.watch("business_description")}
          locationId={methods.watch("business_location")}
          categoryId={methods.watch("business_category")}
          locations={locations}
          categories={categories}
        />
      </div>
    </section>
  );
}
