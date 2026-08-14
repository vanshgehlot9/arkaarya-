"use client";

import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addJob } from "./actions";

export const AddJobModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await addJob(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg text-sm font-semibold hover:bg-[#528210] transition-colors"
      >
        <Plus size={16} />
        Post New Job
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">Create Job Posting</h2>
              <button 
                onClick={() => setIsOpen(false)}
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Job Title</label>
                    <input type="text" name="title" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. ESG Consultant" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Department</label>
                    <select name="department" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]">
                      <option value="Technology">Technology</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Operations">Operations</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Location</label>
                    <input type="text" name="location" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. Mumbai" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Type</label>
                    <select name="employment_type" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Experience</label>
                    <input type="text" name="experience" className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="e.g. 2-4 years" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Work Model</label>
                    <select name="work_model" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]">
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Short Description</label>
                  <input type="text" name="short_description" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="Brief 1-sentence summary for the card..." />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Role Overview</label>
                  <textarea name="overview" rows={3} required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="Detailed description of the role..."></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Responsibilities (One per line)</label>
                    <textarea name="responsibilities" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="• Lead development of...&#10;• Collaborate with..."></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Requirements (One per line)</label>
                    <textarea name="requirements" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]" placeholder="• 3+ years experience...&#10;• Strong communication..."></textarea>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 border-t border-[#E3E8E4]">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 bg-[#F8FAF7] text-[#4A5568] rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 py-3 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Post Job"}
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
