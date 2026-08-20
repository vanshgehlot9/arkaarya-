import React from "react";
import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 w-full h-full text-[#00264A]">
      <Loader2 size={40} className="animate-spin text-[#629A13]" />
      <p className="text-sm font-semibold animate-pulse text-[#5E6672]">Loading...</p>
    </div>
  );
}
