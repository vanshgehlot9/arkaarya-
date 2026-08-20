"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  title: string;
  description: string;
  metadata: {
    effectiveDate: string;
    lastUpdated: string;
    version: string;
  };
  sections: LegalSection[];
  children?: React.ReactNode;
}

const relatedPolicies = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Return & Refund Policy", href: "/refund-cancellation-policy" }
];

export const LegalLayout = ({ title, description, metadata, sections, children }: LegalLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [isTocOpen, setIsTocOpen] = useState(false);

  const handleOpenCalculator = () => {
    router.push("/#impact");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; // offset for sticky header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar onOpenCalculator={handleOpenCalculator} />

      <main className="flex-grow pt-[80px] md:pt-[90px]">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-4">
          <nav className="flex items-center text-sm font-medium text-[#5E6672]">
            <Link href="/" className="hover:text-[#00264A] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Legal</span>
            <span className="mx-2">/</span>
            <span className="text-[#00264A]">{title}</span>
          </nav>
        </div>

        {/* Legal Hero */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 border-b border-[#E3E8E4]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="text-[#629A13] text-sm font-bold tracking-widest uppercase mb-4">
              LEGAL & POLICIES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-[#5E6672] mb-12 max-w-2xl font-sans">
              {description}
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Effective Date</p>
                <p className="text-[#5E6672] text-sm">{metadata.effectiveDate}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-[#5E6672] text-sm">{metadata.lastUpdated}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Version</p>
                <p className="text-[#5E6672] text-sm">{metadata.version}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* Table of Contents - Mobile Collapsible */}
            <div className="lg:hidden mb-8">
              <button 
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full flex items-center justify-between p-4 bg-white border border-[#E3E8E4] rounded-xl font-semibold text-[#00264A]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#629A13]">☰</span> On this page
                </span>
                <ChevronDown className={cn("transition-transform duration-300", isTocOpen && "rotate-180")} size={20} />
              </button>
              
              {isTocOpen && (
                <div className="mt-2 p-4 bg-white border border-[#E3E8E4] rounded-xl shadow-sm">
                  <ul className="space-y-3">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a 
                          href={`#${section.id}`} 
                          onClick={() => setIsTocOpen(false)}
                          className={cn(
                            "flex items-center text-sm font-medium transition-colors",
                            activeSection === section.id ? "text-[#629A13]" : "text-[#5E6672] hover:text-[#00264A]"
                          )}
                        >
                          <span className="w-6 text-xs text-gray-400 font-mono">{String(index + 1).padStart(2, '0')}</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Table of Contents - Desktop Sticky */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-[140px]">
                <h3 className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-6">ON THIS PAGE</h3>
                <ul className="space-y-4 border-l-2 border-[#E3E8E4]/50 pl-4">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`} 
                        className={cn(
                          "flex text-sm font-medium transition-all duration-300 relative",
                          activeSection === section.id ? "text-[#629A13]" : "text-[#5E6672] hover:text-[#00264A]"
                        )}
                      >
                        {activeSection === section.id && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="absolute -left-[18px] top-0 bottom-0 w-[2px] bg-[#629A13] rounded-r-full"
                          />
                        )}
                        <span className="w-8 shrink-0 text-xs opacity-50 font-mono mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-3xl">
              <div className="prose prose-lg prose-blue max-w-none text-[#5E6672]">
                {children}
                
                {sections.map((section, index) => (
                  <motion.div 
                    key={section.id} 
                    id={section.id} 
                    className="mb-16 scroll-mt-[140px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#00264A] mb-6 flex items-baseline gap-3">
                      <span className="text-[#629A13] opacity-60 font-mono text-xl">{index + 1}.</span>
                      {section.title}
                    </h2>
                    <div className="leading-relaxed space-y-4">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Related Policies */}
              <div className="mt-24 pt-12 border-t border-[#E3E8E4]">
                <h3 className="text-xl font-bold text-[#00264A] mb-6">Related Policies</h3>
                <div className="flex flex-col gap-3">
                  {relatedPolicies.filter(p => p.href !== pathname).map(policy => (
                    <Link 
                      key={policy.href} 
                      href={policy.href}
                      className="inline-flex items-center gap-2 text-[#5E6672] hover:text-[#629A13] font-medium transition-colors group w-fit"
                    >
                      <span>{policy.name}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
};
