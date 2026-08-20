"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import { updatePickupStatus } from "../actions";
import { useRouter } from "next/navigation";

export const PickupOperations = ({ id, currentStatus }: { id: string, currentStatus: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(newStatus);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", newStatus);
    
    const result = await updatePickupStatus(formData);
    
    if (result.success) {
      router.refresh();
    } else {
      alert("Error updating status: " + result.error);
    }
    setLoading(null);
  };

  const handleAssignDriver = () => {
    const driverName = prompt("Enter driver name or ID to assign:");
    if (driverName) {
      setLoading('assigned');
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", "in_transit");
      formData.append("notes", `Assigned Driver: ${driverName}`);
      
      updatePickupStatus(formData).then((result) => {
        if (result.success) {
          router.refresh();
        } else {
          alert("Error assigning driver: " + result.error);
        }
        setLoading(null);
      });
    }
  };

  const handleGenerateEPR = () => {
    alert("Generating EPR Certificate... This would normally download a PDF.");
    // Update status to completed if they are generating the certificate
    if (currentStatus !== "completed") {
      handleStatusUpdate("completed");
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this pickup request?")) {
      handleStatusUpdate("cancelled");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6">
      <h2 className="font-bold text-[#00264A] mb-4">Operations</h2>
      <div className="space-y-3">
        <button 
          onClick={handleAssignDriver}
          disabled={loading !== null || currentStatus === 'cancelled' || currentStatus === 'completed'}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div>
            <p className="font-semibold text-[#00264A] text-sm group-hover:text-[#629A13]">
              {loading === 'assigned' ? 'Assigning...' : 'Assign Driver'}
            </p>
            <p className="text-xs text-gray-500">Dispatch logistics team</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#629A13]/10 group-hover:text-[#629A13]">
            +
          </div>
        </button>
        
        <button 
          onClick={handleGenerateEPR}
          disabled={loading !== null || currentStatus === 'cancelled'}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div>
            <p className="font-semibold text-[#00264A] text-sm group-hover:text-[#629A13]">
              {loading === 'completed' ? 'Generating...' : 'Generate EPR Certificate'}
            </p>
            <p className="text-xs text-gray-500">Draft compliance docs</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#629A13]/10 group-hover:text-[#629A13]">
            <CheckCircle2 size={16} />
          </div>
        </button>

        <button 
          onClick={handleCancel}
          disabled={loading !== null || currentStatus === 'cancelled'}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition-colors text-left group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-600" />
            <p className="font-semibold text-red-700 text-sm">
              {loading === 'cancelled' ? 'Cancelling...' : 'Cancel Request'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
