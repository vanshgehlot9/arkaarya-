"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, AlertCircle } from "lucide-react";
import { addIndustry, updateIndustry, deleteIndustry, toggleIndustryActive } from "./actions";

type Industry = {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  illustration_name: string;
  theme_color: string;
  is_active: boolean;
  created_at: string;
};

const iconOptions = ["Database", "Activity", "Building2", "Cpu", "Wifi", "Server", "Smartphone", "Shield", "Briefcase", "Monitor", "Cloud", "Lock"];
const illustrationOptions = ["ITIllustration", "HealthcareIllustration", "EnterpriseIllustration", "TelecomIllustration"];
const colorOptions = ["blue", "emerald", "purple", "orange", "indigo", "rose", "amber", "cyan"];

export default function IndustriesClient({ initialData }: { initialData: Industry[] }) {
  const [industries, setIndustries] = useState<Industry[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (industry: Industry | null = null) => {
    setEditingIndustry(industry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingIndustry(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", formData.get("is_active") === "on" ? "true" : "false");

    if (editingIndustry) {
      formData.set("id", editingIndustry.id);
      const res = await updateIndustry(formData);
      if (res.success) {
        setIndustries(industries.map(i => i.id === editingIndustry.id ? {
          ...i,
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          icon_name: formData.get("icon_name") as string,
          illustration_name: formData.get("illustration_name") as string,
          theme_color: formData.get("theme_color") as string,
          is_active: formData.get("is_active") === "true",
        } : i));
        handleCloseModal();
      }
    } else {
      const res = await addIndustry(formData);
      if (res.success) {
        window.location.reload(); // Simple reload to get new ID from server
      }
    }
    
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;
    const res = await deleteIndustry(id);
    if (res.success) {
      setIndustries(industries.filter(i => i.id !== id));
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setIndustries(industries.map(i => i.id === id ? { ...i, is_active: newStatus } : i));
    await toggleIndustryActive(id, newStatus);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Industries</h1>
          <p className="text-sm text-[#5E6672] mt-1">Manage the sectors you serve.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg hover:bg-[#528210] transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Industry
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-xs uppercase tracking-wider text-[#5E6672] font-semibold">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Icon / Illustration</th>
                <th className="p-4">Color</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {industries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5E6672]">
                    No industries found.
                  </td>
                </tr>
              ) : (
                industries.map((industry) => (
                  <tr key={industry.id} className="hover:bg-[#F8FAF7]/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-[#00264A]">{industry.name}</div>
                      <div className="text-xs text-[#5E6672] max-w-xs truncate">{industry.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium">{industry.icon_name}</div>
                      <div className="text-xs text-[#5E6672]">{industry.illustration_name}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md bg-gray-100">
                        <div className={`w-2 h-2 rounded-full bg-${industry.theme_color}-500`} />
                        {industry.theme_color}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(industry.id, industry.is_active)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          industry.is_active ? "bg-[#629A13]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            industry.is_active ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(industry)}
                          className="p-2 text-[#5E6672] hover:text-[#00264A] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(industry.id)}
                          className="p-2 text-[#5E6672] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">
                {editingIndustry ? "Edit Industry" : "Add New Industry"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Industry Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingIndustry?.name || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. IT & Software"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingIndustry?.description || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm resize-none"
                    placeholder="Brief description of your services for this industry..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Lucide Icon Name</label>
                  <select
                    name="icon_name"
                    defaultValue={editingIndustry?.icon_name || "Database"}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] text-sm bg-white"
                  >
                    {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Illustration Component</label>
                  <select
                    name="illustration_name"
                    defaultValue={editingIndustry?.illustration_name || "ITIllustration"}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] text-sm bg-white"
                  >
                    {illustrationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Theme Color</label>
                  <select
                    name="theme_color"
                    defaultValue={editingIndustry?.theme_color || "blue"}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] text-sm bg-white"
                  >
                    {colorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    defaultChecked={editingIndustry ? editingIndustry.is_active : true}
                    className="w-4 h-4 text-[#629A13] border-gray-300 rounded focus:ring-[#629A13]"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-[#00264A]">
                    Active on Website
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E3E8E4] mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-sm font-medium text-[#5E6672] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-medium bg-[#00264A] text-white hover:bg-[#001A33] rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {isLoading ? "Saving..." : "Save Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
