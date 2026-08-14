"use client";

import React, { useTransition } from "react";
import { ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { toggleJobStatus } from "./actions";

export const JobStatusToggle = ({ id, currentStatus }: { id: string, currentStatus: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleJobStatus(id, currentStatus);
    });
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className="p-1.5 text-gray-400 hover:text-[#00264A] hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
      title={`Switch to ${currentStatus === "Open" ? "Closed" : "Open"}`}
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin text-[#00264A]" />
      ) : currentStatus === 'Open' ? (
        <ToggleRight size={20} className="text-[#629A13]" />
      ) : (
        <ToggleLeft size={20} />
      )}
    </button>
  );
};
