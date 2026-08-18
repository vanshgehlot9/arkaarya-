"use client";

import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addTransaction } from "./actions";

export const AddTransactionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("Income");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await addTransaction(formData);

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
        Add Transaction
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">New Transaction</h2>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Type</label>
                    <select 
                      name="type" 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]"
                    >
                      <option value="Income">Income (+)</option>
                      <option value="Expense">Expense (-)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Amount (₹)</label>
                  <input type="number" name="amount" required min="1" step="0.01" className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="e.g. 50000" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Category</label>
                  <select name="category" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] bg-[#F8FAF7]">
                    {type === "Income" ? (
                      <>
                        <option value="Logistics Service">Logistics Service</option>
                        <option value="Asset Recovery">Asset Recovery</option>
                        <option value="EPR Consulting">EPR Consulting</option>
                        <option value="Data Destruction">Data Destruction</option>
                        <option value="Other Revenue">Other Revenue</option>
                      </>
                    ) : (
                      <>
                        <option value="Logistics & Transport">Logistics & Transport</option>
                        <option value="Payroll">Payroll</option>
                        <option value="Software & IT">Software & IT</option>
                        <option value="Office & Admin">Office & Admin</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other Expense">Other Expense</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#00264A]">Description</label>
                  <input type="text" name="description" required className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" placeholder="Brief description..." />
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
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Save Transaction"}
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
