"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { addEndorsement, updateEndorsement, deleteEndorsement, toggleEndorsementPublished } from "./actions";

type Endorsement = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  author_company: string;
  rating: number;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export default function EndorsementsClient({ initialData }: { initialData: Endorsement[] }) {
  const [endorsements, setEndorsements] = useState<Endorsement[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEndorsement, setEditingEndorsement] = useState<Endorsement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (endorsement: Endorsement | null = null) => {
    setEditingEndorsement(endorsement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingEndorsement(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("is_published", formData.get("is_published") === "on" ? "true" : "false");

    if (editingEndorsement) {
      formData.set("id", editingEndorsement.id);
      const res = await updateEndorsement(formData);
      if (res.success) {
        setEndorsements(endorsements.map(eItem => eItem.id === editingEndorsement.id ? {
          ...eItem,
          quote: formData.get("quote") as string,
          author_name: formData.get("author_name") as string,
          author_role: formData.get("author_role") as string,
          author_company: formData.get("author_company") as string,
          rating: Number(formData.get("rating")),
          display_order: Number(formData.get("display_order")),
          is_published: formData.get("is_published") === "true",
        } : eItem).sort((a, b) => a.display_order - b.display_order));
        handleCloseModal();
      }
    } else {
      const res = await addEndorsement(formData);
      if (res.success) {
        window.location.reload(); 
      }
    }
    
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this endorsement?")) return;
    const res = await deleteEndorsement(id);
    if (res.success) {
      setEndorsements(endorsements.filter(e => e.id !== id));
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setEndorsements(endorsements.map(e => e.id === id ? { ...e, is_published: newStatus } : e));
    await toggleEndorsementPublished(id, newStatus);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Client Endorsements</h1>
          <p className="text-sm text-[#5E6672] mt-1">Manage testimonials and reviews displayed on the site.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg hover:bg-[#528210] transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Endorsement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-xs uppercase tracking-wider text-[#5E6672] font-semibold">
                <th className="p-4 pl-6">Quote</th>
                <th className="p-4">Author Details</th>
                <th className="p-4">Rating / Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {endorsements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5E6672]">
                    No endorsements found.
                  </td>
                </tr>
              ) : (
                endorsements.map((endorsement) => (
                  <tr key={endorsement.id} className="hover:bg-[#F8FAF7]/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="text-sm text-[#00264A] max-w-sm italic truncate">"{endorsement.quote}"</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#00264A]">{endorsement.author_name}</div>
                      <div className="text-xs text-[#5E6672]">
                        {endorsement.author_role}, <span className="font-medium">{endorsement.author_company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-[#629A13] mb-1">
                        {[...Array(endorsement.rating || 5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-[#629A13]" />
                        ))}
                      </div>
                      <div className="text-xs text-[#5E6672]">Order: {endorsement.display_order}</div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublished(endorsement.id, endorsement.is_published)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          endorsement.is_published ? "bg-[#629A13]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            endorsement.is_published ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(endorsement)}
                          className="p-2 text-[#5E6672] hover:text-[#00264A] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(endorsement.id)}
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
                {editingEndorsement ? "Edit Endorsement" : "Add New Endorsement"}
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
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Quote</label>
                  <textarea
                    name="quote"
                    rows={4}
                    required
                    defaultValue={editingEndorsement?.quote || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm resize-none"
                    placeholder="Enter the testimonial quote..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Author Name</label>
                  <input
                    type="text"
                    name="author_name"
                    required
                    defaultValue={editingEndorsement?.author_name || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. Vikram Malhotra"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Author Role</label>
                  <input
                    type="text"
                    name="author_role"
                    defaultValue={editingEndorsement?.author_role || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. Chief Technology Officer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Author Company</label>
                  <input
                    type="text"
                    name="author_company"
                    defaultValue={editingEndorsement?.author_company || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. Apex Financial Technologies"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    defaultValue={editingEndorsement?.rating || 5}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingEndorsement?.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <input
                    type="checkbox"
                    name="is_published"
                    id="is_published"
                    defaultChecked={editingEndorsement ? editingEndorsement.is_published : true}
                    className="w-4 h-4 text-[#629A13] border-gray-300 rounded focus:ring-[#629A13]"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-[#00264A]">
                    Published on Website
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
                  {isLoading ? "Saving..." : "Save Endorsement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
