/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Delete previous Cloudinary image using public_id
  const deletePreviousImage = async (oldPublicId: string | null) => {
    if (!oldPublicId) return;
    try {
      await fetch(`/api/cloudinary/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: oldPublicId }),
      });
      console.log("Old Cloudinary image deleted.");
    } catch {
      console.warn("Failed to delete old Cloudinary image.");
    }
  };

  // ✅ Upload new and delete old
  const uploadImage = async (
    file: File,
    oldPublicId?: string
  ): Promise<{ url: string | null; publicId: string | null }> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError("Missing Cloudinary ENV variables");
      return { url: null, publicId: null };
    }

    await deletePreviousImage(oldPublicId || null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setIsUploading(true);
      setError(null);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.secure_url) {
        setUploadedUrl(data.secure_url);
        setPublicId(data.public_id);
        return { url: data.secure_url, publicId: data.public_id };
      } else {
        setError("Upload failed");
        return { url: null, publicId: null };
      }
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
      return { url: null, publicId: null };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadedUrl,
    publicId,
    error,
    uploadImage,
  };
}
