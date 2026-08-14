"use client";

import React, { useState } from "react";
import { FileText, Search, Filter, Edit, Eye, Trash2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { CreateCaseStudyModal } from "./CreateCaseStudyModal";
import { deleteCaseStudy, toggleCaseStudyPublished } from "./actions";

export default function CaseStudiesClient({ initialData }: { initialData: any[] }) {
  const [studies, setStudies] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [editingStudy, setEditingStudy] = useState<any | null>(null);

  // Extract unique industries for filter
  const industries = Array.from(new Set(initialData.map((s) => s.client_industry))).filter(Boolean);

  const filteredStudies = studies.filter((study) => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          study.client_industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter ? study.client_industry === industryFilter : true;
    return matchesSearch && matchesIndustry;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    const res = await deleteCaseStudy(id);
    if (res.success) {
      setStudies(studies.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setStudies(studies.map(s => s.id === id ? { ...s, is_published: newStatus } : s));
    await toggleCaseStudyPublished(id, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Case Studies</h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage impact stories and success metrics for the website.</p>
        </div>
        <div className="flex gap-3">
          <CreateCaseStudyModal editingStudy={editingStudy} onClose={() => setEditingStudy(null)} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E3E8E4] flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search case studies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
          />
        </div>
        <div className="flex gap-3 relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-[#F8FAF7]">
            <Filter size={16} />
            {industryFilter || "Filter by Industry"}
          </button>
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E3E8E4] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
            <div className="p-2 flex flex-col gap-1">
              <button onClick={() => setIndustryFilter("")} className="text-left px-3 py-2 text-sm text-[#00264A] hover:bg-gray-100 rounded-md w-full">All Industries</button>
              {industries.map(ind => (
                <button key={ind} onClick={() => setIndustryFilter(ind)} className="text-left px-3 py-2 text-sm text-[#00264A] hover:bg-gray-100 rounded-md w-full">{ind}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudies.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-[#E3E8E4] p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <FileText size={24} className="text-gray-400" />
            </div>
            <p className="font-medium text-[#00264A]">No case studies found</p>
          </div>
        ) : (
          filteredStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#629A13]/10 text-[#629A13] rounded-md text-xs font-bold mb-3">
                      {study.category}
                    </span>
                    <h3 className="font-bold text-[#00264A] text-lg leading-tight line-clamp-2">
                      {study.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => handleDelete(study.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <p className="text-sm text-[#4A5568] line-clamp-3 mb-6">
                  {study.description}
                </p>

                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Client Industry:</span>
                    <span className="font-medium text-[#00264A]">{study.client_industry}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Status:</span>
                    <button 
                      onClick={() => handleToggleStatus(study.id, study.is_published)}
                      className={`flex items-center gap-1 font-medium px-2 py-1 rounded-md transition-colors ${
                        study.is_published ? "text-[#629A13] bg-[#629A13]/10 hover:bg-[#629A13]/20" : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {study.is_published ? <><CheckCircle2 size={14} /> Published</> : <><XCircle size={14} /> Draft</>}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F8FAF7] border-t border-[#E3E8E4] p-4 flex gap-3">
                <button 
                  onClick={() => setEditingStudy(study)}
                  className="flex-1 py-2 bg-white text-[#00264A] border border-[#E3E8E4] rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Edit size={16} /> Edit
                </button>
                <Link href={`/impact/${study.slug}`} className="flex-1 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33] flex items-center justify-center gap-2 transition-colors">
                  <Eye size={16} /> Preview
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
