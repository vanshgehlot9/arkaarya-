"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { addStat, updateStat, deleteStat, toggleStatActive } from "./actions";

type Stat = {
  id: string;
  value_key: string;
  label: string;
  numeric_value: number;
  unit: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

const preconfiguredKeys = [
  "devices_recycled",
  "co2_offset",
  "material_recovery",
  "cpcb_compliance",
];

export default function ImpactDashboardClient({ initialData }: { initialData: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (stat: Stat | null = null) => {
    setEditingStat(stat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingStat(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", formData.get("is_active") === "on" ? "true" : "false");

    if (editingStat) {
      formData.set("id", editingStat.id);
      const res = await updateStat(formData);
      if (res.success) {
        setStats(stats.map(s => s.id === editingStat.id ? {
          ...s,
          value_key: formData.get("value_key") as string,
          label: formData.get("label") as string,
          numeric_value: Number(formData.get("numeric_value")),
          unit: formData.get("unit") as string,
          description: formData.get("description") as string,
          display_order: Number(formData.get("display_order")),
          is_active: formData.get("is_active") === "true",
        } : s).sort((a, b) => a.display_order - b.display_order));
        handleCloseModal();
      }
    } else {
      const res = await addStat(formData);
      if (res.success) {
        window.location.reload(); 
      }
    }
    
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;
    const res = await deleteStat(id);
    if (res.success) {
      setStats(stats.filter(s => s.id !== id));
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setStats(stats.map(s => s.id === id ? { ...s, is_active: newStatus } : s));
    await toggleStatActive(id, newStatus);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Impact Dashboard</h1>
          <p className="text-sm text-[#5E6672] mt-1">Manage the core metrics displayed on the animated homepage dashboard.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg hover:bg-[#528210] transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Statistic
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-xs uppercase tracking-wider text-[#5E6672] font-semibold">
                <th className="p-4 pl-6">Metric</th>
                <th className="p-4">Value</th>
                <th className="p-4">System Key</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5E6672]">
                    No statistics found.
                  </td>
                </tr>
              ) : (
                stats.map((stat) => (
                  <tr key={stat.id} className="hover:bg-[#F8FAF7]/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-[#00264A]">{stat.label}</div>
                      <div className="text-xs text-[#5E6672] max-w-xs truncate">{stat.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-xl text-[#629A13]">
                        {stat.numeric_value.toLocaleString("en-IN")}<span className="text-sm ml-1 text-[#00264A]">{stat.unit}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-[#5E6672] text-xs font-mono">
                        {stat.value_key}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(stat.id, stat.is_active)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          stat.is_active ? "bg-[#629A13]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            stat.is_active ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(stat)}
                          className="p-2 text-[#5E6672] hover:text-[#00264A] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(stat.id)}
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
                {editingStat ? "Edit Statistic" : "Add New Statistic"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-2">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> The homepage dashboard specifically looks for these 4 system keys to trigger their unique animations: <code>devices_recycled</code>, <code>co2_offset</code>, <code>material_recovery</code>, <code>cpcb_compliance</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">System Key</label>
                  <input
                    type="text"
                    name="value_key"
                    required
                    list="preconfigured-keys"
                    defaultValue={editingStat?.value_key || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm font-mono"
                    placeholder="e.g. devices_recycled"
                  />
                  <datalist id="preconfigured-keys">
                    {preconfiguredKeys.map(key => <option key={key} value={key} />)}
                  </datalist>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Label (Title)</label>
                  <input
                    type="text"
                    name="label"
                    required
                    defaultValue={editingStat?.label || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. Devices Responsibly Recycled"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Numeric Value</label>
                  <input
                    type="number"
                    step="any"
                    name="numeric_value"
                    required
                    defaultValue={editingStat?.numeric_value || 0}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Unit (e.g. %, +, Metric Tonnes)</label>
                  <input
                    type="text"
                    name="unit"
                    defaultValue={editingStat?.unit || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingStat?.description || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm resize-none"
                    placeholder="Brief description below the metric..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingStat?.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    defaultChecked={editingStat ? editingStat.is_active : true}
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
                  {isLoading ? "Saving..." : "Save Statistic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
