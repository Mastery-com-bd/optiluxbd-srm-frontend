/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useImageUploadImgbb() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Call this to delete the old image
  const deletePreviousImage = async (oldDeleteUrl: string | null) => {
    if (!oldDeleteUrl) return;
    try {
      await fetch(oldDeleteUrl, { method: "GET" });
      console.log("Old image deleted successfully from ImgBB.");
    } catch {
      console.warn("Failed to delete old ImgBB image.");
    }
  };

  // ✅ Upload new image, delete old first
  const uploadImage = async (
    file: File,
    oldDeleteUrl?: string
  ): Promise<{ url: string | null; deleteUrl: string | null }> => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      setError("IMGBB API key is missing (VITE_IMGBB_API_KEY)");
      return { url: null, deleteUrl: null };
    }

    await deletePreviousImage(oldDeleteUrl || null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      setError(null);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.success) {
        const url: string = data.data?.url;
        const delUrl: string = data.data?.delete_url;
        setUploadedUrl(url);
        setDeleteUrl(delUrl);
        return { url, deleteUrl: delUrl };
      } else {
        const msg = data?.error?.message || "Image upload failed";
        setError(msg);
        return { url: null, deleteUrl: null };
      }
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
      return { url: null, deleteUrl: null };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadedUrl,
    deleteUrl,
    error,
    uploadImage,
  };
}
