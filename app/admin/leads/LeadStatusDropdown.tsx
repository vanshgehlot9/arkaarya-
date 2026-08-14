"use client";

import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateLeadStatus } from "./actions";

export const LeadStatusDropdown = ({ id, currentStatus }: { id: string, currentStatus: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'qualified': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'converted': return 'bg-green-50 text-green-700 border-green-200';
      case 'lost': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold border appearance-none pr-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#629A13] ${getStatusColor(currentStatus)} disabled:opacity-50`}
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Converted">Converted</option>
        <option value="Lost">Lost</option>
      </select>
      {isPending && (
        <div className="absolute right-1">
          <Loader2 size={12} className="animate-spin text-gray-500" />
        </div>
      )}
    </div>
  );
};
