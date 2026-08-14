"use client";

import React, { useState } from "react";
import { Search, Filter, Trash2, Truck, MapPin, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { deletePickup } from "./actions";

export default function PickupsClient({ initialData }: { initialData: any[] }) {
  const [pickups, setPickups] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPickups = pickups.filter((pickup) => {
    const query = searchQuery.toLowerCase();
    return (
      (pickup.pickup_id && pickup.pickup_id.toLowerCase().includes(query)) ||
      (pickup.company_name && pickup.company_name.toLowerCase().includes(query)) ||
      (pickup.city && pickup.city.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pickup request?")) return;
    const res = await deletePickup(id);
    if (res.success) {
      setPickups(pickups.filter(p => p.id !== id));
    } else {
      alert("Error deleting pickup");
    }
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_transit': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'received': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Pending';
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Pickup Operations</h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage e-waste pickup requests and logistics.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert('Filters coming soon!')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-[#F8FAF7]">
            <Filter size={16} />
            Filters
          </button>
          <button onClick={() => alert('Export Logistics coming soon!')} className="px-4 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33]">
            Export Logistics
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E3E8E4] flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID, company, or city..." 
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
                <th className="px-6 py-4 font-semibold">Request ID</th>
                <th className="px-6 py-4 font-semibold">Client / Company</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Asset Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {filteredPickups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#4A5568]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Truck size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium">No pickups found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPickups.map((pickup) => (
                  <tr key={pickup.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#00264A]">{pickup.pickup_id}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(pickup.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#00264A]">{pickup.company_name || "-"}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        {pickup.contact_person}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-[#4A5568]">
                        <MapPin size={14} className="text-gray-400" />
                        {pickup.city}, {pickup.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                        {pickup.pickup_type || "E-Waste"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(pickup.status)}`}>
                        {formatStatus(pickup.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 relative">
                        <Link 
                          href={`/admin/pickups/${pickup.id}`}
                          className="px-3 py-1.5 bg-[#F8FAF7] text-[#00264A] border border-[#E3E8E4] rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors flex items-center gap-1"
                        >
                          <Eye size={14} /> Details
                        </Link>
                        <button 
                          onClick={() => handleDelete(pickup.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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
      
    </div>
  );
}
