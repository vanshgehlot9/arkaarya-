import React from "react";

export const AnnouncementBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#F8FAF7] border-b border-[#E3E8E4] px-4 py-2 sm:py-2.5 flex items-center justify-center text-center shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2 font-bold text-[#629A13] tracking-wider shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#629A13] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#629A13]"></span>
          </span>
          COMING SOON
        </div>
        <div className="text-[#00264A] flex flex-wrap items-center justify-center gap-1.5">
          <span className="font-medium hidden sm:inline">Our website is currently under development.</span>
          <span className="font-medium sm:hidden">Website under development.</span>
          
          <a 
            href="mailto:info@aatomate.com" 
            className="group flex items-center gap-1 font-bold text-[#00264A] hover:text-[#629A13] transition-colors whitespace-nowrap ml-1"
          >
            Need assistance? Contact the Aatomate team
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
