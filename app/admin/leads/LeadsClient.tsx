"use client";

import React, { useState } from "react";
import { Search, Filter, Trash2, Mail, Phone, Users } from "lucide-react";
import { LeadStatusDropdown } from "./LeadStatusDropdown";
import { deleteLead } from "./actions";

export default function LeadsClient({ initialData }: { initialData: any[] }) {
  const [leads, setLeads] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    return (
      (lead.name && lead.name.toLowerCase().includes(query)) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.company_name && lead.company_name.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const res = await deleteLead(id);
    if (res.success) {
      setLeads(leads.filter(l => l.id !== id));
    } else {
      alert("Error deleting lead");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Lead Management</h1>
          <p className="text-[#4A5568] text-sm mt-1">View and manage inbound leads across all channels.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert('Filters coming soon!')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-[#F8FAF7]">
            <Filter size={16} />
            Filters
          </button>
          <button onClick={() => alert('Export CSV coming soon!')} className="px-4 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33]">
            Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E3E8E4] flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-[#4A5568]">
              <tr>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Created Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#4A5568]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Users size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium">No leads found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#00264A]">{lead.name || "N/A"}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-[#629A13]">
                          <Mail size={12} /> {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-[#629A13]">
                            <Phone size={12} /> {lead.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {lead.company_name || "-"}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {lead.source || "Website"}
                    </td>
                    <td className="px-6 py-4">
                      <LeadStatusDropdown id={lead.id} currentStatus={lead.status || 'New'} />
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
