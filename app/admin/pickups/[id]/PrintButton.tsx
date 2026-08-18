"use client";

import React from "react";
import { Download } from "lucide-react";

export const PrintButton = () => {
  return (
    <button 
      onClick={() => window.print()}
      className="px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-[#F8FAF7] shadow-sm flex items-center gap-2 print:hidden"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
};
