"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Edit2, Loader2, Save } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { addServiceSolution, updateServiceSolution, deleteServiceSolution } from "./actions";

// List of available icons for the user to choose from
const AVAILABLE_ICONS = [
  "Recycle", "HardDrive", "ShieldCheck", "Cpu", 
  "Sun", "Battery", "Zap", "LineChart", 
  "Network", "Code", "Cloud", "Server", 
  "Database", "Activity", "Layers", "Box"
];

export function ManageSolutionsModal({ service, onClose }: { service: any, onClose: () => void }) {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Box");

  const fetchSolutions = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("service_solutions")
      .select("*")
      .eq("service_id", service.id)
      .order("order_index", { ascending: true });
    
    if (data) setSolutions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSolutions();
  }, [service.id]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIconName("Box");
    setEditingId(null);
  };

  const handleEditClick = (sol: any) => {
    setTitle(sol.title);
    setDescription(sol.description);
    setIconName(sol.icon_name);
    setEditingId(sol.id);
  };

  const handleSave = async () => {
    if (!title || !description || !iconName) return;
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("iconName", iconName);

    if (editingId) {
      formData.append("id", editingId);
      await updateServiceSolution(formData);
    } else {
      formData.append("service_id", service.id);
      await addServiceSolution(formData);
    }

    await fetchSolutions();
    resetForm();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this solution?")) {
      setIsSubmitting(true);
      await deleteServiceSolution(id);
      await fetchSolutions();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00264A]/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
          <div>
            <h2 className="text-xl font-bold text-[#00264A]">Manage Solutions</h2>
            <p className="text-sm text-gray-500 mt-1">Editing solutions for: {service.name}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-50">
          
          {/* Left: List of Solutions */}
          <div className="flex-1 space-y-4">
            <h3 className="font-bold text-[#00264A] mb-4">Current Solutions ({solutions.length})</h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-gray-400">
                <Loader2 className="animate-spin" />
              </div>
            ) : solutions.length === 0 ? (
              <div className="text-center py-8 bg-white border border-dashed border-gray-300 rounded-xl text-gray-500">
                No solutions added yet.
              </div>
            ) : (
              solutions.map((sol) => {
                // Safely get icon or fallback to Box
                const Icon = (LucideIcons as any)[sol.icon_name] || LucideIcons.Box;
                return (
                  <div key={sol.id} className="bg-white p-4 rounded-xl border border-[#E3E8E4] shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00264A]/5 text-[#00264A] flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#00264A] truncate">{sol.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{sol.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => handleEditClick(sol)}
                        disabled={isSubmitting}
                        className="p-1.5 text-gray-400 hover:text-[#00264A] hover:bg-gray-100 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(sol.id)}
                        disabled={isSubmitting}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-[350px] shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-[#E3E8E4] shadow-sm sticky top-0">
              <h3 className="font-bold text-[#00264A] mb-6 flex items-center gap-2">
                {editingId ? <><Edit2 size={16} /> Edit Solution</> : <><Plus size={16} /> Add New Solution</>}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00264A] focus:border-transparent outline-none"
                    placeholder="e.g. Responsible Recycling"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00264A] focus:border-transparent outline-none h-24 resize-none"
                    placeholder="Describe the solution..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select 
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00264A] focus:border-transparent outline-none"
                  >
                    {AVAILABLE_ICONS.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    Preview: 
                    {React.createElement((LucideIcons as any)[iconName] || LucideIcons.Box, { size: 16, className: "text-[#00264A]" })}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                {editingId && (
                  <button 
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="flex-1 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={handleSave}
                  disabled={isSubmitting || !title || !description || !iconName}
                  className="flex-1 py-2 bg-[#00264A] text-white rounded-lg hover:bg-[#001f3f] transition-colors text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingId ? "Update" : "Save Solution"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
