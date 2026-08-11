"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Laptop, Smartphone, Cpu, Recycle, Sun, Zap, Network, Database, Box } from "lucide-react";

interface ServicesProps {
  onOpenPickup?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenPickup = () => {} }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const businesses = [
    {
      id: "01",
      name: "ARKAARYA GREEN",
      category: "E-Waste & Circular Economy",
      description: "Presenting our sustainability vertical, focused on bridging the gap between corporate technology lifecycle management and environmental stewardship.",
      features: [
        "Responsible Recycling",
        "Secure Data Destruction",
        "ESG & Compliance",
      ],
      ctaText: "Explore ArkaArya Green",
      link: "/services/green",
    },
    {
      id: "02",
      name: "ARKAARYA RENEW",
      category: "Renewable Energy Solutions",
      description: "Driving the clean energy transition by delivering sustainable infrastructure, advanced solar solutions, and end-to-end energy consulting.",
      features: [
        "Solar Energy Solutions",
        "Energy Efficiency",
        "Clean Energy Consulting",
      ],
      ctaText: "Explore ArkaArya Renew",
      link: "/services/renew",
    },
    {
      id: "03",
      name: "ARKAARYA QUANTUM",
      category: "IT Consulting & Software",
      description: "Accelerating enterprise digital transformation through custom technology solutions, AI automation, and robust enterprise system engineering.",
      features: [
        "Digital Transformation",
        "Automation & AI",
        "Enterprise Systems",
      ],
      ctaText: "Explore ArkaArya Quantum",
      link: "/services/quantum",
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#F8FAF7] border-b border-[#E3E8E4] overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F7F9F6] rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#629A13]/03 rounded-full blur-3xl pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7F9F6] border border-[#E3E8E4] text-[#00264A] text-xs font-semibold tracking-wider uppercase mb-6">
            <span>Our Services</span>
          </div>
        </motion.div>

        {/* Subtle Horizontal Navigation Indicator */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#E3E8E4] z-0" />
          <div className="relative z-10 flex justify-between">
            {["GREEN", "RENEW", "QUANTUM"].map((label, i) => {
              const id = `0${i + 1}`;
              const isActive = hoveredCard === id;
              return (
                <div key={label} className="flex flex-col items-center gap-2 bg-white px-3">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-[#629A13]" : "bg-[#E3E8E4]"
                  }`} />
                  <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
                    isActive ? "text-[#629A13]" : "text-[#5E6672]"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Equal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-auto">
          {businesses.map((business, idx) => {
            const isHovered = hoveredCard === business.id;

            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                onMouseEnter={() => setHoveredCard(business.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-[#F7F9F6] border border-[#E3E8E4] rounded-[2rem] p-8 sm:p-10 flex flex-col transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,38,74,0.06)] hover:border-[#629A13]"
              >
                {/* Header Hierarchy */}
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-4xl font-serif font-bold transition-colors duration-400 ${
                    isHovered ? "text-[#629A13]" : "text-[#00264A]"
                  }`}>
                    {business.id}
                  </span>
                  <div className="flex-1 h-px bg-[#E3E8E4] relative overflow-hidden">
                    <motion.div 
                      initial={false}
                      animate={{ x: isHovered ? "0%" : "-100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 w-full bg-[#629A13]" 
                    />
                  </div>
                </div>

                <div className="mb-6 relative">
                  <h3 className="text-[10px] font-bold text-[#00264A] tracking-widest uppercase mb-1.5">
                    {business.name}
                  </h3>
                  <h4 className="text-xl font-serif font-bold text-[#00264A]">
                    {business.category}
                  </h4>
                </div>

                {/* Large Visual Area */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-white border border-[#E3E8E4] shadow-xs flex items-center justify-center relative mb-8 overflow-hidden">
                  
                  {/* Subtle Background Accent */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#629A13]/05 to-transparent`} />
                  
                  <motion.div 
                    animate={{ scale: isHovered ? 1.04 : 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center z-10 p-6"
                  >
                    {business.id === "01" && <GreenIllustration isHovered={isHovered} />}
                    {business.id === "02" && <RenewIllustration isHovered={isHovered} />}
                    {business.id === "03" && <QuantumIllustration isHovered={isHovered} />}
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                  <p className="text-[13px] sm:text-sm text-[#5E6672] leading-relaxed mb-8 min-h-[60px]">
                    {business.description}
                  </p>

                  <div className="flex flex-col gap-3 mb-10">
                    {business.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-[#629A13] shrink-0 opacity-90" />
                        <span className="text-[13px] font-semibold text-[#00264A] leading-tight mt-0.5">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Navigational CTA */}
                  <a 
                    href={business.link}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-xs text-[#00264A] group-hover:text-[#629A13] transition-colors duration-300 w-fit"
                  >
                    <span className="tracking-wide">{business.ctaText}</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// ==========================================
// Custom Animated Editorial Illustrations
// ==========================================

const GreenIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center text-[#00264A]">
    
    {/* Large Central Recycling Symbol */}
    <motion.div 
      animate={{ rotate: isHovered ? 180 : 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute text-[#629A13]/20"
    >
      <Recycle size={140} strokeWidth={1} />
    </motion.div>

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      
      {/* E-Waste Elements */}
      <motion.div
        animate={{ 
          x: isHovered ? -15 : -30, 
          y: isHovered ? -15 : -25,
          rotate: isHovered ? 10 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute w-12 h-12 bg-white rounded-lg shadow-sm border border-[#E3E8E4] flex items-center justify-center text-[#00264A]"
      >
        <Laptop size={20} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ 
          x: isHovered ? 20 : 35, 
          y: isHovered ? -10 : -20,
          rotate: isHovered ? -10 : 0
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute w-10 h-10 bg-white rounded-lg shadow-sm border border-[#E3E8E4] flex items-center justify-center text-[#00264A]"
      >
        <Smartphone size={18} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ 
          x: isHovered ? -10 : -25, 
          y: isHovered ? 25 : 35,
          rotate: isHovered ? -15 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="absolute w-12 h-12 bg-white rounded-lg shadow-sm border border-[#E3E8E4] flex items-center justify-center text-[#00264A]"
      >
        <Cpu size={20} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ 
          x: isHovered ? 15 : 30, 
          y: isHovered ? 20 : 30,
          rotate: isHovered ? 5 : 0
        }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="absolute w-12 h-12 bg-white rounded-lg shadow-sm border border-[#E3E8E4] flex items-center justify-center text-[#00264A]"
      >
        <Database size={20} strokeWidth={1.5} />
      </motion.div>

      {/* Collection Box (Center) */}
      <div className="absolute w-16 h-16 bg-white rounded-xl shadow-md border-2 border-[#629A13] flex items-center justify-center z-10">
        <Box size={24} className="text-[#629A13]" strokeWidth={1.5} />
      </div>

    </div>
  </div>
);

const RenewIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center text-[#00264A]">
    
    {/* Sun and Sunlight */}
    <motion.div 
      animate={{ 
        scale: isHovered ? 1.3 : 1,
        opacity: isHovered ? 0.3 : 0.1
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute top-[10%] right-[15%] w-24 h-24 bg-yellow-400 rounded-full blur-2xl"
    />
    
    <motion.div 
      animate={{ 
        rotate: isHovered ? 45 : 0,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute top-[15%] right-[20%] text-yellow-500"
    >
      <Sun size={32} strokeWidth={1.5} />
    </motion.div>

    {/* Solar Panel */}
    <div className="absolute bottom-[20%] w-[140px] h-[70px] bg-[#00264A] rounded-lg shadow-md border-2 border-[#00264A] grid grid-cols-4 grid-rows-2 gap-[1px] p-[2px] transform -skew-x-12 relative overflow-hidden z-10">
      
      {/* Light Sweep Effect */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
      />

      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white/10 w-full h-full" />
      ))}
    </div>

    {/* Energy Flow Line */}
    <svg className="absolute left-[20%] bottom-[25%] w-32 h-16 z-0 overflow-visible">
      <path 
        d="M 120 10 Q 60 10 20 50" 
        fill="none" 
        stroke="#E3E8E4" 
        strokeWidth="2"
      />
      <motion.path 
        d="M 120 10 Q 60 10 20 50" 
        fill="none" 
        stroke="#629A13" 
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </svg>

    {/* Small Energy Icon */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isHovered ? 1 : 0, 
        opacity: isHovered ? 1 : 0 
      }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute left-[12%] bottom-[12%] w-8 h-8 bg-white rounded-full shadow-sm border border-[#629A13] flex items-center justify-center text-[#629A13]"
    >
      <Zap size={14} />
    </motion.div>
  </div>
);

const QuantumIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center text-[#00264A]">
    
    {/* Grid Background */}
    <div className="absolute inset-0 pointer-events-none" />

    {/* Central CPU */}
    <motion.div 
      animate={{ 
        scale: isHovered ? 1.08 : 1,
        boxShadow: isHovered ? "0 0 30px rgba(98, 154, 19, 0.15)" : "0 0 10px rgba(0, 38, 74, 0.05)"
      }}
      transition={{ duration: 0.5 }}
      className="absolute w-24 h-24 bg-white rounded-2xl shadow-md border-2 border-[#00264A] flex items-center justify-center z-10"
    >
      <div className="w-14 h-14 border-2 border-[#E3E8E4] rounded-lg flex items-center justify-center">
        <motion.div 
          animate={{ 
            opacity: isHovered ? [0.4, 1, 0.4] : 0.8,
            scale: isHovered ? [0.9, 1.1, 0.9] : 1
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 bg-[#629A13] rounded-sm"
        />
      </div>

      {/* Edge Pins */}
      <div className="absolute -top-1.5 inset-x-4 flex justify-between"><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/></div>
      <div className="absolute -bottom-1.5 inset-x-4 flex justify-between"><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/></div>
      <div className="absolute -left-1.5 inset-y-4 flex flex-col justify-between"><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/></div>
      <div className="absolute -right-1.5 inset-y-4 flex flex-col justify-between"><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/><div className="w-1.5 h-1.5 bg-[#00264A]"/></div>
    </motion.div>

    {/* Circuit Paths & Nodes */}
    {[[15, 20], [85, 25], [20, 80], [80, 85]].map((pos, i) => (
      <div key={i}>
        <motion.div
          animate={{ 
            backgroundColor: isHovered ? "#629A13" : "#E3E8E4",
            scale: isHovered ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 1, delay: i * 0.15, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
          className="absolute w-2.5 h-2.5 rounded-full z-10"
          style={{ top: `${pos[0]}%`, left: `${pos[1]}%` }}
        />
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <motion.line
            x1="50%" y1="50%" x2={`${pos[1]}%`} y2={`${pos[0]}%`}
            stroke={isHovered ? "#629A13" : "#E3E8E4"}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: isHovered ? [0, -20] : 0 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>
    ))}
    
    {/* Software Interface / Code Window Element */}
    <motion.div
      animate={{ 
        x: isHovered ? -10 : -20,
        y: isHovered ? 10 : 20,
        opacity: isHovered ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute left-[10%] bottom-[15%] w-16 h-10 bg-white rounded-md shadow-md border border-[#E3E8E4] p-1.5 z-20"
    >
      <div className="w-full flex gap-1 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
      </div>
      <div className="w-3/4 h-1 bg-[#E3E8E4] rounded-full mb-1" />
      <div className="w-1/2 h-1 bg-[#E3E8E4] rounded-full" />
    </motion.div>
  </div>
);

export default Services;
