"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TOCProps {
  headings: { id: string; text: string; level: number }[];
}

export const TableOfContents: React.FC<TOCProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  if (headings.length === 0) return null;

  // Calculate the sequence number for h2 headings only
  let h2Count = 0;
  const headingsWithSequence = headings.map(heading => {
    if (heading.level === 2) {
      h2Count++;
      return { ...heading, sequence: h2Count };
    }
    return { ...heading, sequence: null };
  });

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="lg:hidden mb-8">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#E3E8E4] rounded-xl shadow-sm text-[#00264A] font-bold"
        >
          <span>On This Page</span>
          {isMobileOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isMobileOpen && (
          <div className="mt-2 bg-white border border-[#E3E8E4] rounded-xl p-4 shadow-lg flex flex-col gap-3">
            {headingsWithSequence.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`text-sm transition-colors block ${
                  heading.level === 3 ? "pl-4 text-gray-500" : "font-semibold text-[#00264A]"
                } ${activeId === heading.id ? "text-[#629A13]" : "hover:text-[#629A13]"}`}
              >
                {heading.text}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-32">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5E6672] mb-5">On This Page</h4>
        <nav className="flex flex-col gap-3.5 border-l-2 border-[#E3E8E4] pl-4">
          {headingsWithSequence.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`flex text-sm transition-all duration-200 relative ${
                heading.level === 3 ? "pl-3 text-gray-500 text-xs" : "font-semibold text-[#00264A]"
              } ${activeId === heading.id ? "text-[#629A13]" : "hover:text-[#629A13]"}`}
            >
              {/* Active Indicator Line */}
              {activeId === heading.id && (
                <span className="absolute -left-[18px] top-0 bottom-0 w-[2px] bg-[#629A13] rounded-full" />
              )}
              {heading.level === 2 && heading.sequence && (
                <span className="w-8 shrink-0 text-xs opacity-50 font-mono mt-0.5">{String(heading.sequence).padStart(2, '0')}</span>
              )}
              <span>{heading.text}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
