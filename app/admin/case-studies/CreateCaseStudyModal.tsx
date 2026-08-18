"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Loader2, Info, BookOpen, BarChart3, Image as ImageIcon, Globe } from "lucide-react";
import { addCaseStudy, updateCaseStudy } from "./actions";

type Tab = "basic" | "story" | "metrics" | "media" | "publishing";

export const CreateCaseStudyModal = ({ editingStudy = null, onClose = null }: { editingStudy?: any, onClose?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("basic");

  // Open modal automatically when an editingStudy is passed in
  useEffect(() => {
    if (editingStudy) {
      setIsOpen(true);
      setActiveTab("basic");
    }
  }, [editingStudy]);

  const handleClose = () => {
    setIsOpen(false);
    setActiveTab("basic");
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

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "story", label: "The Story", icon: BookOpen },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "publishing", label: "Publish", icon: Globe },
  ];

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
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4] shrink-0">
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

            {/* Tab Navigation */}
            <div className="flex px-6 border-b border-[#E3E8E4] shrink-0 overflow-x-auto custom-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                      isActive 
                        ? "border-[#629A13] text-[#629A13]" 
                        : "border-transparent text-[#5E6672] hover:text-[#00264A] hover:border-[#E3E8E4]"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAF7]">
              <form id="case-study-form" onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium">
                    {error}
                  </div>
                )}

                <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm">
                  
                  {/* TAB 1: BASIC INFO */}
                  <div className={activeTab === "basic" ? "block space-y-5" : "hidden"}>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">Title</label>
                      <input type="text" name="title" required defaultValue={editingStudy?.title} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Zero-Waste Logistics for TechCorp" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#00264A]">Category</label>
                        <select name="category" required defaultValue={editingStudy?.category} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]">
                          <option value="IT Asset Disposition">IT Asset Disposition</option>
                          <option value="EPR Compliance">EPR Compliance</option>
                          <option value="Data Destruction">Data Destruction</option>
                          <option value="Circular Economy">Circular Economy</option>
                          <option value="Renewable Energy">Renewable Energy</option>
                          <option value="Enterprise Systems">Enterprise Systems</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#00264A]">Industry <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input type="text" name="client_industry" defaultValue={editingStudy?.client_industry} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. FinTech" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#00264A]">Location <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input type="text" name="location" defaultValue={editingStudy?.location} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Bangalore, India" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">Short Description (Overview)</label>
                      <textarea name="description" rows={3} required defaultValue={editingStudy?.description} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="Brief summary of the case study..."></textarea>
                    </div>
                  </div>

                  {/* TAB 2: THE STORY */}
                  <div className={activeTab === "story" ? "block space-y-5" : "hidden"}>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                      <p className="text-sm text-blue-800">These fields populate the main editorial content of the case study. Be descriptive and focus on outcomes.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">The Challenge</label>
                      <textarea name="challenge" rows={4} defaultValue={editingStudy?.challenge} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="What specific problem was the client facing?"></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">The Solution</label>
                      <textarea name="solution" rows={4} defaultValue={editingStudy?.solution} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="How did ArkaArya solve this problem?"></textarea>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">The Results</label>
                      <textarea name="results" rows={4} defaultValue={editingStudy?.results} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="What were the measurable outcomes and business impacts?"></textarea>
                    </div>
                  </div>

                  {/* TAB 3: METRICS */}
                  <div className={activeTab === "metrics" ? "block space-y-5" : "hidden"}>
                    <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 mb-6">
                      <p className="text-sm text-green-800">Add up to 3 key metrics that will be prominently displayed at the top of the case study. Empty rows will be ignored.</p>
                    </div>

                    <div className="space-y-4">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="flex gap-4 p-4 rounded-xl border border-[#E3E8E4] bg-[#F8FAF7]">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#E3E8E4] flex items-center justify-center font-bold text-[#00264A] shrink-0">
                            {num}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-[#5E6672] uppercase">Metric Value</label>
                              <input type="text" name={`metric_${num}_value`} defaultValue={editingStudy?.metrics?.[num-1]?.value} className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="e.g. 12,500+" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-[#5E6672] uppercase">Metric Label</label>
                              <input type="text" name={`metric_${num}_label`} defaultValue={editingStudy?.metrics?.[num-1]?.label} className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] text-sm" placeholder="e.g. Devices Recycled" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAB 4: MEDIA */}
                  <div className={activeTab === "media" ? "block space-y-5" : "hidden"}>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#00264A]">Cover Image URL</label>
                      <input type="text" name="cover_image" defaultValue={editingStudy?.cover_image} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. /corporate_ewaste_recovery.png" />
                      <p className="text-xs text-[#5E6672] mt-1">Provide a high-quality absolute or relative URL for the hero image.</p>
                    </div>

                    {editingStudy?.cover_image && (
                      <div className="mt-4 rounded-xl border border-[#E3E8E4] overflow-hidden bg-[#F8FAF7] p-2 aspect-[21/9] flex items-center justify-center">
                        <img src={editingStudy.cover_image} alt="Preview" className="max-w-full max-h-full rounded-lg object-contain" />
                      </div>
                    )}
                  </div>

                  {/* TAB 5: PUBLISHING */}
                  <div className={activeTab === "publishing" ? "block space-y-5" : "hidden"}>
                    <div className="flex items-start gap-4 bg-[#F8FAF7] p-6 rounded-xl border border-[#E3E8E4]">
                      <input 
                        type="checkbox" 
                        name="is_published" 
                        id="is_published" 
                        defaultChecked={editingStudy ? editingStudy.is_published : true} 
                        className="w-5 h-5 mt-1 text-[#629A13] rounded focus:ring-[#629A13] cursor-pointer" 
                      />
                      <div>
                        <label htmlFor="is_published" className="text-base font-bold text-[#00264A] cursor-pointer block mb-1">
                          Publish immediately
                        </label>
                        <p className="text-sm text-[#5E6672]">
                          If checked, this case study will be visible to the public on the website. If unchecked, it will be saved as a draft and hidden from public view.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </form>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#E3E8E4] bg-white shrink-0 flex items-center justify-between gap-4">
              <button 
                type="button" 
                onClick={handleClose}
                className="px-6 py-2.5 text-[#5E6672] font-bold hover:bg-[#F8FAF7] rounded-xl transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex gap-3">
                {activeTab !== "publishing" && (
                  <button 
                    type="button" 
                    onClick={() => {
                      const currentIndex = tabs.findIndex(t => t.id === activeTab);
                      if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1].id);
                    }}
                    className="px-6 py-2.5 bg-[#F8FAF7] border border-[#E3E8E4] text-[#00264A] rounded-xl font-bold hover:bg-[#E3E8E4] transition-colors"
                  >
                    Next Step
                  </button>
                )}
                
                <button 
                  form="case-study-form"
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-2.5 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 min-w-[150px]"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Save Case Study"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
