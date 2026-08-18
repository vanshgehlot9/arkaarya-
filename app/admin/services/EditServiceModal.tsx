"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Info, LayoutTemplate, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { updateService } from "./actions";

export const EditServiceModal = ({ editingService = null, onClose = null }: { editingService?: any, onClose?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState(editingService?.image_url || "");
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
      if (editingService) {
        setIsOpen(true);
        setImageUrl(editingService.image_url || "");
      }
    }, [editingService]);

    const handleClose = () => {
      setIsOpen(false);
      if (onClose) onClose();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setError("");
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        setImageUrl(data.url);
      } catch (err) {
        console.error(err);
        setError("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      formData.set("id", editingService.id);
      formData.set("identifier", editingService.identifier);
      if (imageUrl) {
        formData.set("image_url", imageUrl);
      }

      const result = await updateService(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        handleClose();
        setLoading(false);
        window.location.reload();
      }
    };

  if (!isOpen || !editingService) return null;

  return (
    <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#00264A]">Edit Service Card</h2>
            <p className="text-sm text-[#5E6672] mt-1">Changes reflect directly on the homepage.</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAF7]">
          <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm space-y-5">
              
              <div className="flex items-center gap-2 mb-4 text-[#00264A]">
                <Info size={18} className="text-[#629A13]" />
                <h3 className="font-bold">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Overline Name</label>
                  <input type="text" name="name" required defaultValue={editingService.name} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. ARKAARYA GREEN" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Primary Heading</label>
                  <input type="text" name="category" required defaultValue={editingService.category} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. E-Waste & Circular Economy" />
                </div>
              </div>

              <div className="space-y-1 mt-4">
                <label className="text-sm font-semibold text-[#00264A]">Description</label>
                <textarea name="description" rows={3} required defaultValue={editingService.description} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="Brief summary of the service..."></textarea>
              </div>

            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-4 text-[#00264A]">
                <LayoutTemplate size={18} className="text-[#629A13]" />
                <h3 className="font-bold">Service Image</h3>
              </div>
              <p className="text-xs text-[#5E6672] mb-4">Upload an image or paste a URL to replace the default illustration.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Image URL</label>
                  <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" 
                    placeholder="https://..." 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Upload New</label>
                  <label className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-dashed border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-colors cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 size={16} className="animate-spin text-[#629A13]" /> : <LayoutTemplate size={16} className="text-[#629A13]" />}
                    <span className="text-sm font-medium text-[#4A5568]">
                      {isUploading ? "Uploading..." : "Click to Upload"}
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-[#E3E8E4] aspect-video w-full max-w-sm">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-4 text-[#00264A]">
                <CheckCircle2 size={18} className="text-[#629A13]" />
                <h3 className="font-bold">Key Features (Bullets)</h3>
              </div>
              <p className="text-xs text-[#5E6672] mb-4">Provide up to 3 short bullet points.</p>

              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-[#F8FAF7] border border-[#E3E8E4] flex items-center justify-center text-xs font-bold text-[#5E6672] shrink-0">
                      {num}
                    </div>
                    <input 
                      type="text" 
                      name={`feature_${num}`} 
                      defaultValue={editingService.features?.[num-1] || ""} 
                      className="flex-1 px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" 
                      placeholder={`Feature ${num}`} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-4 text-[#00264A]">
                <LinkIcon size={18} className="text-[#629A13]" />
                <h3 className="font-bold">Navigation</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Call to Action Text</label>
                  <input type="text" name="cta_text" required defaultValue={editingService.cta_text} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Explore ArkaArya Green" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Destination URL</label>
                  <input type="text" name="link" required defaultValue={editingService.link} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. /services/green" />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#E3E8E4] bg-white shrink-0 flex items-center justify-end gap-4">
          <button 
            type="button" 
            onClick={handleClose}
            className="px-6 py-2.5 text-[#5E6672] font-bold hover:bg-[#F8FAF7] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            form="service-form"
            type="submit" 
            disabled={loading}
            className="px-8 py-2.5 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 min-w-[150px]"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
};
