"use client";

import React from "react";
import { Button } from "src/components/ui/button";

// ------------------------------------------------------------

type UsahaImageUploadProps = {
  imagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageClick: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
};

// ------------------------------------------------------------

export function UsahaImageUpload({
  imagePreview,
  fileInputRef,
  onImageClick,
  onImageChange,
  onImageRemove,
}: UsahaImageUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Foto Usaha</label>
      <div
        onClick={onImageClick}
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
          onChange={onImageChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
      </div>

      {imagePreview && (
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="w-fit"
          onClick={(e) => {
            e.stopPropagation();
            onImageRemove();
          }}
        >
          Hapus Foto
        </Button>
      )}
    </div>
  );
}
