"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addCaseStudy, updateCaseStudy } from "./actions";

export const CreateCaseStudyModal = ({ editingStudy = null, onClose = null }: { editingStudy?: any, onClose?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Open modal automatically when an editingStudy is passed in
  useEffect(() => {
    if (editingStudy) {
      setIsOpen(true);
    }
  }, [editingStudy]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    let result;
    if (editingStudy) {
      formData.set("id", editingStudy.id);
      result = await updateCaseStudy(formData);
    } else {
      result = await addCaseStudy(formData);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      handleClose();
      setLoading(false);
      window.location.reload(); // Quick refresh to show new grid
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg text-sm font-semibold hover:bg-[#528210] transition-colors"
      >
        <Plus size={16} />
        Create Case Study
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">
                {editingStudy ? "Edit Case Study" : "Draft New Case Study"}
              </h2>
              <button 
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Title</label>
                  <input type="text" name="title" required defaultValue={editingStudy?.title} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Zero-Waste Logistics for TechCorp" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Category</label>
                    <select name="category" required defaultValue={editingStudy?.category} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]">
                      <option value="IT Asset Disposition">IT Asset Disposition</option>
                      <option value="EPR Compliance">EPR Compliance</option>
                      <option value="Data Destruction">Data Destruction</option>
                      <option value="Circular Economy">Circular Economy</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Industry</label>
                    <input type="text" name="client_industry" defaultValue={editingStudy?.client_industry} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. FinTech" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Location</label>
                    <input type="text" name="location" defaultValue={editingStudy?.location} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Bangalore" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Short Description</label>
                  <textarea name="description" rows={2} required defaultValue={editingStudy?.description} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="Brief summary of the impact..."></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">The Challenge</label>
                  <textarea name="challenge" rows={3} defaultValue={editingStudy?.challenge} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="What problem were they facing?"></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">The Solution</label>
                  <textarea name="solution" rows={3} defaultValue={editingStudy?.solution} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="How did ArkaArya solve it?"></textarea>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">The Results</label>
                  <textarea name="results" rows={3} defaultValue={editingStudy?.results} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="Metrics and outcomes..."></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Cover Image URL</label>
                  <input type="text" name="cover_image" defaultValue={editingStudy?.cover_image} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. /corporate_ewaste_recovery.png" />
                </div>

                <div className="space-y-3 bg-[#F8FAF7] p-4 rounded-xl border border-[#E3E8E4]">
                  <label className="text-sm font-semibold text-[#00264A]">Key Metrics (Displayed on Website)</label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="metric_1_value" defaultValue={editingStudy?.metrics?.[0]?.value} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 1 Value (e.g. 12,500+)" />
                    <input type="text" name="metric_1_label" defaultValue={editingStudy?.metrics?.[0]?.label} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 1 Label (e.g. Devices)" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="metric_2_value" defaultValue={editingStudy?.metrics?.[1]?.value} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 2 Value (e.g. 98%)" />
                    <input type="text" name="metric_2_label" defaultValue={editingStudy?.metrics?.[1]?.label} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 2 Label (e.g. Material Recovery)" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="metric_3_value" defaultValue={editingStudy?.metrics?.[2]?.value} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 3 Value (e.g. 420+)" />
                    <input type="text" name="metric_3_label" defaultValue={editingStudy?.metrics?.[2]?.label} className="px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="Metric 3 Label (e.g. Tonnes CO₂)" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#F8FAF7] p-4 rounded-xl border border-[#E3E8E4]">
                  <input type="checkbox" name="is_published" id="is_published" defaultChecked={editingStudy ? editingStudy.is_published : true} className="w-5 h-5 text-[#629A13] rounded focus:ring-[#629A13]" />
                  <label htmlFor="is_published" className="text-sm font-semibold text-[#00264A] cursor-pointer">
                    Publish immediately (Make visible on public website)
                  </label>
                </div>

                <div className="pt-4 flex gap-3 border-t border-[#E3E8E4]">
                  <button 
                    type="button" 
                    onClick={handleClose}
                    className="flex-1 py-3 bg-[#F8FAF7] text-[#4A5568] rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 py-3 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Save Case Study"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
