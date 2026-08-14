"use client";

import React, { useState } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { updatePickupStatus } from "./actions";

export const UpdatePickupStatusModal = ({ id, currentStatus }: { id: string, currentStatus: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("id", id);
    const result = await updatePickupStatus(formData);

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
        className="flex items-center gap-2 px-4 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33] transition-colors shadow-sm"
      >
        Update Status <ArrowRight size={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">Update Pickup Status</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">New Status</label>
                  <select name="status" defaultValue={currentStatus} required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]">
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_transit">In Transit</option>
                    <option value="received">Received</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Status Notes</label>
                  <textarea name="notes" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="E.g., Vehicle dispatched, driver is Rajesh..."></textarea>
                </div>

                <div className="pt-4 flex gap-3">
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
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Save Update"}
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
