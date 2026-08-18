"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Video } from "lucide-react";
import { addActivity, updateActivity, deleteActivity, toggleActivityPublished } from "./actions";

type Activity = {
  id: string;
  title: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  category: string;
  activity_date: string | null;
  is_published: boolean;
  created_at: string;
};

const categoryOptions = ["Community", "Environment", "Team", "Events", "Feed"];

export default function SocialActivitiesClient({ initialData }: { initialData: Activity[] }) {
  const [activities, setActivities] = useState<Activity[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      
      const urlInput = document.getElementById("media_url_input") as HTMLInputElement;
      if (urlInput) {
        urlInput.value = data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleOpenModal = (activity: Activity | null = null) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingActivity(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("is_published", formData.get("is_published") === "on" ? "true" : "false");

    if (editingActivity) {
      formData.set("id", editingActivity.id);
      const res = await updateActivity(formData);
      if (res.success) {
        setActivities(activities.map(a => a.id === editingActivity.id ? {
          ...a,
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          media_url: formData.get("media_url") as string,
          media_type: formData.get("media_type") as "image" | "video",
          category: formData.get("category") as string,
          activity_date: formData.get("activity_date") as string || null,
          is_published: formData.get("is_published") === "true",
        } : a));
        handleCloseModal();
      }
    } else {
      const res = await addActivity(formData);
      if (res.success) {
        window.location.reload(); 
      }
    }
    
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    const res = await deleteActivity(id);
    if (res.success) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setActivities(activities.map(a => a.id === id ? { ...a, is_published: newStatus } : a));
    await toggleActivityPublished(id, newStatus);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Social Activities</h1>
          <p className="text-sm text-[#5E6672] mt-1">Manage gallery images and community impact stories.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg hover:bg-[#528210] transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Activity
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-xs uppercase tracking-wider text-[#5E6672] font-semibold">
                <th className="p-4 pl-6 w-16">Media</th>
                <th className="p-4">Details</th>
                <th className="p-4">Category / Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5E6672]">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#F8FAF7]/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                        {activity.media_url ? (
                          <img src={activity.media_url} alt={activity.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                        {activity.media_type === "video" && (
                          <div className="absolute top-1 right-1 bg-black/50 rounded p-0.5 text-white">
                            <Video size={10} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#00264A]">{activity.title}</div>
                      <div className="text-xs text-[#5E6672] max-w-xs truncate">{activity.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center px-2 py-1 rounded-md bg-[#00264A]/5 text-[#00264A] text-xs font-semibold mb-1">
                        {activity.category}
                      </div>
                      <div className="text-xs text-[#5E6672]">
                        {activity.activity_date ? new Date(activity.activity_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : "No date"}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublished(activity.id, activity.is_published)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          activity.is_published ? "bg-[#629A13]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            activity.is_published ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(activity)}
                          className="p-2 text-[#5E6672] hover:text-[#00264A] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
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
                {editingActivity ? "Edit Activity" : "Add New Activity"}
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
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingActivity?.title || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                    placeholder="e.g. Community Tree Planting"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingActivity?.description || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm resize-none"
                    placeholder="Describe the activity..."
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Media URL (Image or Video)</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="media_url_input"
                      type="text"
                      name="media_url"
                      required
                      defaultValue={editingActivity?.media_url || ""}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                      placeholder="/images/example.jpg or https://..."
                    />
                    <label className={`flex items-center justify-center px-4 py-2.5 bg-[#F8FAF7] hover:bg-gray-100 text-[#00264A] rounded-lg cursor-pointer transition-colors border border-[#E3E8E4] font-semibold text-sm shrink-0 ${isUploadingMedia ? 'opacity-70 pointer-events-none' : ''}`}>
                      {isUploadingMedia ? (
                        <span className="flex items-center gap-2">Uploading...</span>
                      ) : (
                        <span className="flex items-center gap-2">Upload File</span>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*" 
                        onChange={handleFileUpload} 
                        disabled={isUploadingMedia} 
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Media Type</label>
                  <select
                    name="media_type"
                    defaultValue={editingActivity?.media_type || "image"}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] text-sm bg-white"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Category</label>
                  <select
                    name="category"
                    defaultValue={editingActivity?.category || "Community"}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] text-sm bg-white"
                  >
                    {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Date</label>
                  <input
                    type="date"
                    name="activity_date"
                    defaultValue={editingActivity?.activity_date || ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <input
                    type="checkbox"
                    name="is_published"
                    id="is_published"
                    defaultChecked={editingActivity ? editingActivity.is_published : true}
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
                  {isLoading ? "Saving..." : "Save Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
