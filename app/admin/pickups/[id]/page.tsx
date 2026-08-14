import React from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import { ArrowLeft, MapPin, Building, Phone, Mail, Box, Clock, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { UpdatePickupStatusModal } from "../UpdatePickupStatusModal";
import Link from "next/link";

export const revalidate = 0;

export default async function PickupDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  
  const { data: pickup, error } = await supabase
    .from("pickup_requests")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !pickup) {
    console.error("Error fetching pickup details:", error);
    notFound();
  }

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
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center gap-4">
        <Link href="/admin/pickups" className="p-2 bg-white border border-[#E3E8E4] rounded-lg text-gray-500 hover:text-[#00264A] hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#00264A]">Pickup #{pickup.pickup_id}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(pickup.status)}`}>
              {formatStatus(pickup.status || 'pending')}
            </span>
          </div>
          <p className="text-[#4A5568] text-sm mt-1">
            Created on {new Date(pickup.created_at).toLocaleString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-[#F8FAF7] shadow-sm">
            Download PDF
          </button>
          <UpdatePickupStatusModal id={pickup.id} currentStatus={pickup.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Client Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E3E8E4] bg-[#F8FAF7]">
              <h2 className="font-bold text-[#00264A] flex items-center gap-2">
                <Building size={18} className="text-[#629A13]" /> Client Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Company Name</p>
                <p className="font-semibold text-[#00264A]">{pickup.company_name || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                <p className="font-semibold text-[#00264A]">{pickup.contact_person}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Phone size={14} /> Phone</p>
                <p className="font-semibold text-[#00264A]">{pickup.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Mail size={14} /> Email</p>
                <p className="font-semibold text-[#00264A]">{pickup.email}</p>
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E3E8E4] bg-[#F8FAF7]">
              <h2 className="font-bold text-[#00264A] flex items-center gap-2">
                <Box size={18} className="text-[#629A13]" /> Request Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Asset Category</p>
                  <p className="font-semibold text-[#00264A]">{pickup.pickup_type || "E-Waste"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Weight/Quantity</p>
                  <p className="font-semibold text-[#00264A]">{pickup.estimated_weight || "Not specified"}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#E3E8E4]">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPin size={14} /> Pickup Address</p>
                <p className="font-medium text-[#00264A] leading-relaxed">
                  {pickup.address}<br />
                  {pickup.city}, {pickup.state} {pickup.pincode}
                </p>
              </div>

              {pickup.notes && (
                <div className="pt-4 border-t border-[#E3E8E4]">
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FileText size={14} /> Additional Notes</p>
                  <div className="bg-gray-50 p-4 rounded-xl text-sm text-[#4A5568]">
                    {pickup.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Actions */}
        <div className="space-y-6">
          
          {/* Scheduling */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6">
            <h2 className="font-bold text-[#00264A] mb-4 flex items-center gap-2">
              <Clock size={18} className="text-[#629A13]" /> Scheduling
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Preferred Date</p>
                <p className="font-semibold text-[#00264A]">{pickup.preferred_date ? new Date(pickup.preferred_date).toLocaleDateString() : "Anytime"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Preferred Time</p>
                <p className="font-semibold text-[#00264A]">{pickup.preferred_time || "Business Hours"}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions (Placeholders for future) */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6">
            <h2 className="font-bold text-[#00264A] mb-4">Operations</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-colors text-left group">
                <div>
                  <p className="font-semibold text-[#00264A] text-sm group-hover:text-[#629A13]">Assign Driver</p>
                  <p className="text-xs text-gray-500">Dispatch logistics team</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#629A13]/10 group-hover:text-[#629A13]">
                  +
                </div>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-colors text-left group">
                <div>
                  <p className="font-semibold text-[#00264A] text-sm group-hover:text-[#629A13]">Generate EPR Certificate</p>
                  <p className="text-xs text-gray-500">Draft compliance docs</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#629A13]/10 group-hover:text-[#629A13]">
                  <CheckCircle2 size={16} />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition-colors text-left group mt-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-red-600" />
                  <p className="font-semibold text-red-700 text-sm">Cancel Request</p>
                </div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
