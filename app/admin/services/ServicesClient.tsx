"use client";

import React, { useState } from "react";
import { LayoutTemplate, Edit, CheckCircle2, XCircle } from "lucide-react";
import { toggleServicePublished } from "./actions";
import { EditServiceModal } from "./EditServiceModal";
import { ManageSolutionsModal } from "./ManageSolutionsModal";

export default function ServicesClient({ initialData }: { initialData: any[] }) {
  const [services, setServices] = useState(initialData);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [managingSolutions, setManagingSolutions] = useState<any | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setServices(services.map(s => s.id === id ? { ...s, is_published: newStatus } : s));
    await toggleServicePublished(id, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Our Services</h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage the content for the core service pillars on the homepage.</p>
        </div>
      </div>

      {services.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl flex items-start gap-3 mb-6">
          <div className="mt-0.5">⚠️</div>
          <div>
            <h3 className="font-bold">No services found in database!</h3>
            <p className="text-sm">Please run the SQL schema setup script in Supabase to create and seed the `services` table.</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.sort((a, b) => a.order_index - b.order_index).map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-[#629A13]/10 text-[#629A13] rounded-md text-xs font-bold mb-3">
                    0{service.order_index} • {service.name}
                  </span>
                  <h3 className="font-bold text-[#00264A] text-lg leading-tight line-clamp-2">
                    {service.category}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-[#4A5568] line-clamp-3 mb-6 min-h-[60px]">
                {service.description}
              </p>

              <div className="space-y-2 mt-auto pt-4 border-t border-[#E3E8E4]">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500 font-medium">Card Identifier:</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono font-bold text-[#00264A]">{service.identifier}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <button 
                    onClick={() => handleToggleStatus(service.id, service.is_published)}
                    className={`flex items-center gap-1 font-medium px-2 py-1 rounded-md transition-colors ${
                      service.is_published ? "text-[#629A13] bg-[#629A13]/10 hover:bg-[#629A13]/20" : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {service.is_published ? <><CheckCircle2 size={14} /> Published</> : <><XCircle size={14} /> Hidden</>}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8FAF7] border-t border-[#E3E8E4] p-4 flex gap-3">
              <button 
                onClick={() => setEditingService(service)}
                className="flex-1 py-2 bg-white text-[#00264A] border border-[#E3E8E4] rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Edit size={16} /> Edit Content
              </button>
              <button 
                onClick={() => setManagingSolutions(service)}
                className="flex-1 py-2 bg-[#00264A] text-white border border-[#00264A] rounded-lg text-sm font-semibold hover:bg-[#001f3f] flex items-center justify-center gap-2"
              >
                <LayoutTemplate size={16} /> Manage Solutions
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditServiceModal editingService={editingService} onClose={() => setEditingService(null)} />
      {managingSolutions && (
        <ManageSolutionsModal 
          service={managingSolutions} 
          onClose={() => setManagingSolutions(null)} 
        />
      )}
    </div>
  );
}
