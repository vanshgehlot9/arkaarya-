"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  metrics: { value: string; label: string }[];
}

// Data
const caseStudies: CaseStudy[] = [
  {
    id: "01",
    category: "CORPORATE",
    title: "Corporate E-Waste Recovery",
    description: "Complete asset recovery and secure data sanitization for a Fortune 500 tech enterprise across 14 regional offices.",
    image: "/corporate_ewaste_recovery.png",
    metrics: [
      { value: "12,500+", label: "Devices Recovered" },
      { value: "98%", label: "Material Recovery" },
      { value: "420+", label: "Tonnes CO₂ Impact" },
    ],
  },
  {
    id: "02",
    category: "DATA CENTERS",
    title: "Data Center Asset Recovery",
    description: "End-of-life decommissioning of legacy server infrastructure with NIST-certified on-site data wiping.",
    image: "/datacenter_asset_recovery.png",
    metrics: [
      { value: "8,200", label: "Drives Sanitized" },
      { value: "Zero", label: "Data Breach Incidents" },
      { value: "$1.2M", label: "Value Recovered" },
    ],
  },
  {
    id: "03",
    category: "HEALTHCARE",
    title: "Healthcare Equipment Recycling",
    description: "Safe and compliant disposal of bio-hazardous electronic medical equipment and MRI systems.",
    image: "/healthcare_equipment_recycling.png",
    metrics: [
      { value: "450+", label: "Systems Recycled" },
      { value: "100%", label: "EPA Compliant" },
      { value: "15", label: "Hospitals Served" },
    ],
  },
  {
    id: "04",
    category: "MANUFACTURING",
    title: "Manufacturing E-Waste Management",
    description: "Closed-loop urban mining recovering precious metals from industrial robotic components and PLCs.",
    image: "/manufacturing_ewaste_management.png",
    metrics: [
      { value: "2.4", label: "Metric Tonnes Gold" },
      { value: "99%", label: "Landfill Diversion" },
      { value: "12", label: "Facilities Integrated" },
    ],
  },
  {
    id: "05",
    category: "SECURE ITAD",
    title: "Secure IT Asset Disposal",
    description: "Military-grade physical destruction and precious metal refining of classified communication devices.",
    image: "/secure_it_asset_disposal.png",
    metrics: [
      { value: "35,000", label: "Assets Shredded" },
      { value: "DoD", label: "Standard Compliant" },
      { value: "24/7", label: "Secure Chain of Custody" },
    ],
  },
];

export const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  // Helper to determine the status of a card relative to active
  const getCardPosition = (index: number) => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex - 1 + caseStudies.length) % caseStudies.length) return "prev";
    if (index === (activeIndex + 1) % caseStudies.length) return "next";
    return "hidden";
  };

  if (!isClient) return null;

  return (
    <section id="impact" className="relative w-full py-24 sm:py-32 bg-[#F8FAF7] overflow-hidden perspective-1000">
      
      {/* Subtle 3D Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
        <div className="absolute w-[800px] h-[800px] border border-[#629A13]/20 rounded-full animate-spin-slow [animation-duration:120s]"></div>
        <div className="absolute w-[600px] h-[600px] border border-[#00264A]/10 rounded-full animate-spin-reverse-slow [animation-duration:90s] border-dashed"></div>
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-[#629A13] rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[20%] w-3 h-3 bg-[#00264A] rounded-full blur-[3px] animate-pulse [animation-delay:2s]"></div>
        
        {/* Abstract Isometric Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #00264A 1px, transparent 1px), linear-gradient(to bottom, #00264A 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            transform: `rotateX(60deg) rotateY(0deg) rotateZ(-45deg) scale(2)`,
            transformOrigin: `center center`
          }}
        ></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] text-xs font-bold tracking-wider uppercase shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#629A13]" />
            <span>CASE STUDIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] tracking-tight mb-6">
            Impact That Speaks for Itself.
          </h2>
          <p className="text-base sm:text-lg text-[#5E6672] leading-relaxed">
            Real projects. Measurable outcomes. Sustainable solutions built for complex operations.
          </p>
        </motion.div>

        {/* 3D Stage Container */}
        <div className="relative h-[650px] sm:h-[600px] w-full flex items-center justify-center [perspective:1200px]">
          
          <AnimatePresence initial={false} custom={direction}>
            {caseStudies.map((study, index) => {
              const position = getCardPosition(index);
              const isActive = position === "active";
              const isPrev = position === "prev";
              const isNext = position === "next";
              const isHidden = position === "hidden";

              // Responsive variants based on screen size
              const isMobile = window.innerWidth < 768;

              // Framer Motion Variants for 3D depth
              const variants = {
                active: {
                  zIndex: 30,
                  scale: 1,
                  x: 0,
                  z: 0,
                  rotateY: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                prev: {
                  zIndex: 20,
                  scale: isMobile ? 0.85 : 0.9,
                  x: isMobile ? "-100%" : "-40%",
                  z: -100,
                  rotateY: isMobile ? 0 : 15,
                  opacity: isMobile ? 0 : 0.6,
                  filter: "blur(2px)",
                },
                next: {
                  zIndex: 20,
                  scale: isMobile ? 0.85 : 0.9,
                  x: isMobile ? "100%" : "40%",
                  z: -100,
                  rotateY: isMobile ? 0 : -15,
                  opacity: isMobile ? 0 : 0.6,
                  filter: "blur(2px)",
                },
                hidden: {
                  zIndex: 10,
                  scale: 0.8,
                  x: direction > 0 ? "50%" : "-50%",
                  z: -200,
                  rotateY: 0,
                  opacity: 0,
                  filter: "blur(4px)",
                }
              };

              return (
                <motion.div
                  key={study.id}
                  custom={direction}
                  variants={variants}
                  initial="hidden"
                  animate={position}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`absolute w-full max-w-[800px] ${!isActive ? 'pointer-events-none' : 'pointer-events-auto'} origin-center`}
                >
                  <motion.div 
                    whileHover={isActive && !isMobile ? "hover" : ""}
                    className="relative w-full bg-white rounded-[24px] sm:rounded-[32px] border border-[#E3E8E4] p-2 shadow-[0_20px_50px_rgba(0,38,74,0.06)] overflow-hidden group transform-gpu"
                  >
                    {/* Inner Eco Green Hover Line */}
                    <motion.div 
                      className="absolute top-0 left-0 h-1 bg-[#629A13] z-20"
                      variants={{
                        hover: { width: "100%", transition: { duration: 0.5, ease: "easeOut" } },
                      }}
                      initial={{ width: "0%" }}
                    />

                    <div className="flex flex-col h-full bg-[#F8FAF7] rounded-[20px] sm:rounded-[28px] overflow-hidden">
                      
                      {/* Image Area */}
                      <div className="relative w-full h-[250px] sm:h-[300px] overflow-hidden bg-[#00264A]">
                        {/* Dynamic Category Label overlay */}
                        <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#00264A]">
                          {study.id} — {study.category}
                        </div>
                        
                        <motion.img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                          variants={{
                            hover: { scale: 1.03 }
                          }}
                        />
                        
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00264A]/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Content Area */}
                      <div className="p-6 sm:p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A] mb-3">
                          {study.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#5E6672] mb-8 line-clamp-2">
                          {study.description}
                        </p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-[#E3E8E4]">
                          {study.metrics.map((metric, i) => (
                            <motion.div 
                              key={i} 
                              className="flex flex-col gap-1 transition-colors duration-300"
                              variants={{
                                hover: { color: "#00264A" }
                              }}
                            >
                              <span className="text-xl sm:text-2xl font-bold text-[#629A13] group-hover:text-[#528210] transition-colors">
                                {metric.value}
                              </span>
                              <span className="text-[10px] sm:text-xs font-bold text-[#5E6672] uppercase tracking-wider">
                                {metric.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto">
                          <button className="flex items-center gap-2 text-sm font-bold text-[#00264A] hover:text-[#629A13] transition-colors group/btn">
                            View Case Study 
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Minimal Navigation Controls */}
        <div className="flex items-center justify-center gap-8 mt-12 sm:mt-16">
          <button 
            onClick={handlePrev}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#E3E8E4] bg-white text-[#00264A] hover:border-[#629A13] hover:bg-[#629A13] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            aria-label="Previous Case Study"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 font-dm-sans font-medium text-sm tracking-widest text-[#5E6672]">
            <span className="text-[#00264A] font-bold">
              {caseStudies[activeIndex].id}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-60">0{caseStudies.length}</span>
          </div>
          
          <button 
            onClick={handleNext}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#E3E8E4] bg-white text-[#00264A] hover:border-[#629A13] hover:bg-[#629A13] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            aria-label="Next Case Study"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
