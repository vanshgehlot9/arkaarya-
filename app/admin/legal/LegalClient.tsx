"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Scale, Plus, Search, Edit2, Globe, Archive, MoreVertical, ShieldAlert, Eye, FileText, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { publishLegalDocument, unpublishLegalDocument, archiveLegalDocument } from "./actions";

export default function LegalClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [documents, setDocuments] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.document_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> Published</span>;
      case "draft": return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><Edit2 size={12}/> Draft</span>;
      case "archived": return <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><Archive size={12}/> Archived</span>;
      default: return null;
    }
  };

  const handlePublish = async (id: string) => {
    if (!confirm("Are you sure you want to publish this document? It will become visible on the public website immediately.")) return;
    setDocuments(documents.map(d => d.id === id ? { ...d, status: "published" } : d));
    await publishLegalDocument(id);
  };

  const handleUnpublish = async (id: string) => {
    if (!confirm("Are you sure you want to unpublish? This will remove the document from the public website and it will return a 404 Error if visited directly.")) return;
    setDocuments(documents.map(d => d.id === id ? { ...d, status: "draft" } : d));
    await unpublishLegalDocument(id);
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Are you sure you want to archive this document? It will no longer be public but will remain in your dashboard history.")) return;
    setDocuments(documents.map(d => d.id === id ? { ...d, status: "archived" } : d));
    await archiveLegalDocument(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A] flex items-center gap-2">
            <Scale size={24} className="text-[#629A13]" />
            Legal & Compliance
          </h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage public policies, terms, and legal documents.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#00264A] hover:bg-[#001A33] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Create Document
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-[#E3E8E4] bg-[#F8FAF7] flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search legal documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E3E8E4] text-sm focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#E3E8E4] text-xs uppercase tracking-wider text-[#5E6672] font-semibold">
                <th className="px-6 py-4">Document</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F8FAF7]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAF7] border border-[#E3E8E4] flex items-center justify-center text-[#00264A]">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-[#00264A]">{doc.title}</div>
                        <div className="text-xs font-mono text-[#5E6672] mt-0.5">/legal/{doc.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#00264A]">v{doc.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#00264A]">
                      {doc.updated_at ? format(new Date(doc.updated_at), "dd MMM yyyy") : "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      {doc.status === 'published' && (
                        <a 
                          href={`/legal/${doc.slug}`} 
                          target="_blank" rel="noreferrer"
                          title="View Live"
                          className="p-2 text-[#5E6672] hover:text-[#629A13] hover:bg-[#629A13]/10 rounded-lg transition-colors"
                        >
                          <Globe size={18} />
                        </a>
                      )}

                      <Link 
                        href={`/admin/legal/${doc.id}`}
                        title="Edit Document"
                        className="p-2 flex items-center justify-center text-[#5E6672] hover:text-[#00264A] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </Link>

                      <div className="relative group/menu">
                        <button className="p-2 text-[#5E6672] hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E3E8E4] rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 py-1">
                          
                          {doc.status !== 'published' && (
                            <button onClick={() => handlePublish(doc.id)} className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center gap-2">
                              <CheckCircle2 size={16} /> Publish
                            </button>
                          )}
                          
                          {doc.status === 'published' && (
                            <button onClick={() => handleUnpublish(doc.id)} className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2">
                              <ShieldAlert size={16} /> Unpublish
                            </button>
                          )}

                          {doc.status !== 'archived' && (
                            <button onClick={() => handleArchive(doc.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100 mt-1 pt-2">
                              <Archive size={16} /> Archive
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <ShieldAlert size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No legal documents found.</p>
                    <p className="text-sm text-gray-400 mt-1">Make sure you have run the setup SQL script.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic Create Modal overlay (redirects to editor on create) */}
      {isCreateModalOpen && (
        <CreateModal onClose={() => setIsCreateModalOpen(false)} router={router} />
      )}
    </div>
  );
}

function CreateModal({ onClose, router }: { onClose: () => void, router: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      document_type: formData.get("document_type") as string,
      effective_date: formData.get("effective_date") as string,
    };

    const { createLegalDocument } = await import("./actions");
    const result = await createLegalDocument(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(`/admin/legal/${result.id}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-[#E3E8E4] flex justify-between items-center">
          <h2 className="font-bold text-[#00264A]">Create Legal Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-[#00264A] mb-1">Document Title</label>
            <input type="text" name="title" required placeholder="e.g. Privacy Policy" className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4]" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#00264A] mb-1">URL Slug</label>
            <input type="text" name="slug" required placeholder="e.g. privacy-policy" className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4]" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#00264A] mb-1">Document Type</label>
            <select name="document_type" required className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4] bg-white">
              <option value="privacy_policy">Privacy Policy</option>
              <option value="terms_conditions">Terms & Conditions</option>
              <option value="cookie_policy">Cookie Policy</option>
              <option value="return_refund">Return & Refund Policy</option>
              <option value="shipping_policy">Shipping Policy</option>
              <option value="cancellation_policy">Cancellation Policy</option>
              <option value="custom">Custom Policy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#00264A] mb-1">Effective Date (Optional)</label>
            <input type="date" name="effective_date" className="w-full px-4 py-2.5 rounded-lg border border-[#E3E8E4]" />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[#5E6672] font-semibold hover:bg-gray-50 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[#00264A] text-white rounded-lg font-semibold hover:bg-[#001A33] disabled:opacity-70">
              {loading ? "Creating..." : "Create & Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
