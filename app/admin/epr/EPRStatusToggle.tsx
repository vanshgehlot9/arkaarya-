"use client";

import React, { useState } from "react";
import { updateEprStatus } from "./actions";

export const EPRStatusToggle = ({ id, currentStatus }: { id: string, currentStatus: string }) => {
  const [status, setStatus] = useState(currentStatus || 'pending');
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s?.toLowerCase()) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);
    
    await updateEprStatus(id, newStatus);
    
    setIsUpdating(false);
  };

  return (
    <select 
      value={status}
      onChange={handleUpdate}
      disabled={isUpdating}
      className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-[#629A13]/50 transition-colors disabled:opacity-70 ${getStatusColor(status)}`}
    >
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
};
