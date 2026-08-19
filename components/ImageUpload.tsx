"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Loader2, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  name?: string;
}

export default function ImageUpload({ value, onChange, label, className = "", name }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-semibold text-[#00264A]">{label}</label>}
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#E3E8E4] bg-gray-50 group">
          <img src={value} alt="Uploaded preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white rounded-lg text-[#00264A] hover:bg-gray-100 transition-colors shadow-sm"
              title="Change Image"
            >
              <UploadCloud size={20} />
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors shadow-sm"
              title="Remove Image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            error ? "border-red-300 bg-red-50" : "border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7]"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Loader2 size={32} className="animate-spin text-[#629A13] mb-2" />
              <p className="text-sm font-medium">Uploading image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#4A5568]">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                <ImageIcon size={24} className="text-[#629A13]" />
              </div>
              <p className="text-sm font-medium text-[#00264A]">Click to upload an image</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/png, image/jpeg, image/webp, image/gif" 
        className="hidden" 
      />
      
      {/* Hidden value input for native form submission */}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
