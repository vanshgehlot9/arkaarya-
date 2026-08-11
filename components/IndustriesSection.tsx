"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, Server, Activity, Landmark, Laptop, Factory, 
  GraduationCap, Store, Package, Building, Plane, 
  Cpu, Network, HeartPulse, Shield, ScanBarcode, CreditCard, Monitor 
} from "lucide-react";

interface IndustriesSectionProps {
  onOpenPickup?: () => void;
}

// ==========================================
// Custom Industrial Editorial Illustrations
// ==========================================
// These are heavily optimized. Avoid heavy JS-based animations where possible.

const ITIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00264A10_1px,transparent_1px),linear-gradient(to_bottom,#00264A10_1px,transparent_1px)] bg-[size:20px_20px]" />
    
    <div className="relative w-24 h-32 bg-white border-2 border-[#00264A] rounded-lg shadow-sm flex flex-col p-2 gap-2 z-10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full h-5 border border-[#E3E8E4] rounded-sm flex items-center px-2 justify-between bg-[#F7F9F6]">
          <div className="w-8 h-1 bg-[#E3E8E4]" />
          <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#629A13] animate-pulse' : 'bg-[#00264A]/30'}`} style={{ animationDelay: `${i * 150}ms` }} />
        </div>
      ))}
    </div>
    <div className="absolute right-[20%] top-[20%] w-12 h-12 bg-white border border-[#E3E8E4] rounded-lg flex items-center justify-center text-[#629A13] shadow-md">
      <Network size={20} />
    </div>
  </motion.div>
);

const HealthIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00264A05_1px,transparent_1px)] bg-[size:10px_10px]" />
    
    <div className="relative w-32 h-24 bg-white border-2 border-[#00264A] rounded-xl shadow-sm p-2 z-10 flex flex-col">
      <div className="w-full h-full bg-[#F7F9F6] border border-[#E3E8E4] rounded-md overflow-hidden relative">
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 50">
          <motion.polyline 
            points="0,25 20,25 30,10 40,40 50,25 100,25"
            fill="none"
            stroke={isHovered ? "#629A13" : "#00264A40"}
            strokeWidth="2"
            initial={{ pathLength: 1 }}
            animate={{ strokeDashoffset: isHovered ? [100, 0] : 100, strokeDasharray: "100 100" }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "linear" }}
          />
        </svg>
      </div>
      <div className="w-10 h-2 bg-[#E3E8E4] mx-auto mt-2 rounded-full" />
    </div>
    
    <div className="absolute left-[15%] bottom-[15%] w-10 h-10 bg-white border border-[#E3E8E4] rounded-lg flex items-center justify-center text-[#629A13] shadow-md">
      <HeartPulse size={18} />
    </div>
  </motion.div>
);

const BankIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="relative w-24 h-36 bg-white border-2 border-[#00264A] rounded-t-xl rounded-b-md shadow-sm flex flex-col items-center pt-4 z-10">
      <div className="w-16 h-10 bg-[#00264A] rounded-sm mb-4 flex items-center justify-center text-white">
        <Shield size={16} className={isHovered ? "opacity-100 text-[#629A13]" : "opacity-50"} />
      </div>
      <div className="grid grid-cols-3 gap-1 px-4 w-full mb-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-2 bg-[#E3E8E4] rounded-sm" />
        ))}
      </div>
      <div className={`w-12 h-1 mt-auto mb-4 transition-colors ${isHovered ? "bg-[#629A13]" : "bg-[#00264A]/30"}`} />
    </div>

    <motion.div 
      animate={{ y: isHovered ? -15 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-[10%] w-16 h-10 bg-[#F7F9F6] border border-[#629A13] rounded-md flex items-center justify-center shadow-lg text-[#629A13] z-0"
    >
      <CreditCard size={18} />
    </motion.div>
  </motion.div>
);

const CorpIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-32 h-20 bg-white border-2 border-[#00264A] rounded-t-xl p-2">
        <div className="w-full h-full bg-[#F7F9F6] border border-[#E3E8E4] flex items-center justify-center relative overflow-hidden">
           {isHovered && (
             <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-[sweep_2s_linear_infinite]" />
           )}
           <Monitor size={20} className={isHovered ? "text-[#629A13]" : "text-[#00264A]/30"} />
        </div>
      </div>
      <div className="w-40 h-3 bg-[#00264A] rounded-b-xl rounded-t-sm" />
      <div className="w-12 h-1 bg-white/20 -mt-2 mx-auto rounded-full z-20" />
    </div>
  </motion.div>
);

const MfgIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00264A10_1px,transparent_1px),linear-gradient(to_bottom,#00264A10_1px,transparent_1px)] bg-[size:15px_15px] skew-y-6" />
    
    <div className="relative w-36 h-28 bg-white border-2 border-[#00264A] rounded-lg shadow-sm z-10 flex items-center p-3 gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-[#00264A] border-dashed flex items-center justify-center">
         <div className={`w-full h-full rounded-full border-[6px] border-[#629A13] border-t-transparent border-b-transparent transition-transform duration-[3000ms] ${isHovered ? 'rotate-180' : 'rotate-0'}`} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full h-3 bg-[#00264A] rounded-sm" />
        <div className="w-3/4 h-3 bg-[#E3E8E4] rounded-sm" />
        <div className={`w-1/2 h-3 rounded-sm transition-colors ${isHovered ? 'bg-[#629A13]' : 'bg-[#E3E8E4]'}`} />
      </div>
    </div>
  </motion.div>
);

const EduIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="grid grid-cols-2 gap-4 relative z-10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-12 h-10 bg-white border-2 border-[#00264A] rounded-md relative overflow-hidden">
            <div className={`absolute inset-0 bg-[#629A13]/20 transition-opacity duration-700 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }} />
          </div>
          <div className="w-14 h-1.5 bg-[#00264A] mt-1 rounded-sm" />
        </div>
      ))}
    </div>
  </motion.div>
);

const RetailIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="relative w-20 h-32 bg-white border-2 border-[#00264A] rounded-xl shadow-sm flex flex-col pt-3 items-center z-10">
      <div className="w-16 h-12 bg-[#F7F9F6] border border-[#E3E8E4] rounded-md relative overflow-hidden flex items-center justify-center">
        <span className={`font-mono text-xs font-bold transition-colors ${isHovered ? 'text-[#629A13]' : 'text-[#00264A]/30'}`}>₹0.00</span>
      </div>
      <div className="w-full mt-auto mb-4 grid grid-cols-3 gap-1 px-3">
        {[...Array(9)].map((_, i) => <div key={i} className="w-full h-1.5 bg-[#00264A]/20 rounded-sm" />)}
      </div>
    </div>
    
    <div className={`absolute right-[20%] top-[30%] w-12 h-8 bg-white border border-[#E3E8E4] rounded shadow-md flex flex-col justify-center gap-1 px-2 z-20 transition-all duration-300 ${isHovered ? 'translate-x-5 opacity-100' : 'translate-x-0 opacity-0'}`}>
      <div className="w-full h-0.5 bg-[#00264A]" />
      <div className="w-3/4 h-0.5 bg-[#00264A]" />
      <div className="w-full h-0.5 bg-[#00264A]" />
      <div className={`absolute left-0 w-full h-[1px] bg-red-500 shadow-[0_0_5px_red] transition-all duration-500 ${isHovered ? 'translate-y-2' : 'translate-y-0'}`} />
    </div>
  </motion.div>
);

const LogisticsIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="absolute bottom-[20%] w-full h-1 bg-[#E3E8E4] z-0 flex gap-2 overflow-hidden">
      <div className={`flex gap-4 w-[200%] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-translate-x-[100px]' : 'translate-x-0'}`}>
        {[...Array(10)].map((_, i) => <div key={i} className="w-4 h-2 bg-[#00264A]/10 rounded-sm mt-1" />)}
      </div>
    </div>
    
    <div className={`relative z-10 w-16 h-16 bg-white border-2 border-[#00264A] rounded-md shadow-md flex items-center justify-center mb-6 transition-transform duration-[2000ms] ease-linear ${isHovered ? 'translate-x-[60px]' : 'translate-x-0'}`}>
      <ScanBarcode size={24} className={isHovered ? 'text-[#629A13]' : 'text-[#00264A]'} />
    </div>
  </motion.div>
);

const GovIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="relative w-28 h-32 bg-white border-2 border-[#00264A] rounded-md shadow-sm z-10 flex flex-col p-2 gap-1.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full h-8 bg-[#F7F9F6] border border-[#E3E8E4] rounded-sm flex items-center px-2">
          <div className="w-2 h-2 rounded-full bg-[#00264A]/30 mr-2" />
          <div className="w-12 h-1.5 bg-[#00264A]/10 rounded-full" />
          <div className={`w-1.5 h-1.5 rounded-full ml-auto ${isHovered ? 'bg-red-500 animate-pulse' : 'bg-[#E3E8E4]'}`} style={{ animationDelay: `${i * 200}ms` }} />
        </div>
      ))}
    </div>
    <div className="absolute right-[20%] -top-[10%] w-14 h-14 bg-white border border-[#E3E8E4] rounded-full flex items-center justify-center text-[#629A13] shadow-lg z-20">
      <Shield size={24} />
    </div>
  </motion.div>
);

const HospIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div 
    animate={{ scale: isHovered ? 1.05 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-full h-full flex items-center justify-center text-[#00264A] will-change-transform"
  >
    <div className="relative w-32 h-20 bg-white border-2 border-[#00264A] rounded-xl shadow-sm z-10 p-2 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="w-8 h-2 bg-[#E3E8E4] rounded-sm" />
        <div className={`w-8 h-2 rounded-sm transition-colors ${isHovered ? 'bg-[#629A13]' : 'bg-[#E3E8E4]'}`} />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className={`w-full h-4 rounded-sm transition-colors duration-300 ${isHovered && i % 3 === 0 ? 'bg-[#629A13]' : 'bg-[#F7F9F6] border border-[#E3E8E4]'}`} 
          />
        ))}
      </div>
    </div>
    <div className="absolute bottom-[10%] w-6 h-12 bg-[#00264A] rounded-sm" />
  </motion.div>
);

// ==========================================
// Individual Industry Card Component (Optimized)
// ==========================================
// Isolated component so hovering one card doesn't re-render all 10 cards.

interface IndustryCardProps {
  ind: any;
}

const IndustryCard = React.memo(({ ind }: IndustryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Illustration = ind.illustration;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[340px] xl:w-[380px] group relative bg-white border border-[#E3E8E4] rounded-[2rem] p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,38,74,0.08)] hover:border-[#629A13]"
    >
      {/* Number & Metadata */}
      <div className="flex items-center justify-between mb-5">
        <span className={`text-4xl font-serif font-bold transition-colors duration-300 ${
          isHovered ? "text-[#629A13]" : "text-[#00264A]"
        }`}>
          {ind.id}
        </span>
        <span className="text-[9px] font-mono font-bold text-[#5E6672] bg-[#F7F9F6] px-2 py-1 rounded-sm uppercase tracking-wider">
          {ind.metadata}
        </span>
      </div>

      <div className="flex-1 h-px bg-[#E3E8E4] mb-5 relative overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 h-full bg-[#629A13] transition-all duration-300 ease-out ${isHovered ? 'w-full' : 'w-0'}`} 
        />
      </div>

      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ind.icon size={16} className={`transition-colors duration-300 ${isHovered ? "text-[#629A13]" : "text-[#00264A]"}`} />
          <h3 className="text-[10px] font-bold text-[#00264A] tracking-widest uppercase">
            Industrial Sector
          </h3>
        </div>
        <h4 className="text-xl font-serif font-bold text-[#00264A] leading-tight">
          {ind.title}
        </h4>
      </div>

      {/* Industrial Visual */}
      <div className="w-full h-[200px] bg-[#F7F9F6] border border-[#E3E8E4] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
        <Illustration isHovered={isHovered} />
      </div>

      {/* Description */}
      <p className="text-sm text-[#5E6672] leading-relaxed mb-8 flex-1">
        {ind.desc}
      </p>

      {/* CTA */}
      <a 
        href={`#industry-${ind.id}`}
        className={`mt-auto inline-flex items-center gap-2 font-bold text-xs transition-colors duration-300 w-fit ${isHovered ? 'text-[#629A13]' : 'text-[#00264A]'}`}
      >
        <span className="tracking-wide">Explore Industry</span>
        <div className={`transition-transform duration-300 ${isHovered ? 'translate-x-1.5' : 'translate-x-0'}`}>
          <ArrowRight size={14} />
        </div>
      </a>
    </div>
  );
});
IndustryCard.displayName = "IndustryCard";

// ==========================================
// Industries Configuration
// ==========================================

const industries = [
  {
    id: "01",
    title: "IT & Data Centers",
    desc: "Secure decommissioning of servers, networking hardware, and enterprise storage systems.",
    icon: Server,
    illustration: ITIllustration,
    metadata: "SYS-01: NETWORK/STORAGE",
  },
  {
    id: "02",
    title: "Healthcare & MedTech",
    desc: "Compliant disposal of diagnostic equipment, laboratory electronics, and patient monitors.",
    icon: Activity,
    illustration: HealthIllustration,
    metadata: "SYS-02: MED/DIAGNOSTIC",
  },
  {
    id: "03",
    title: "Banking & Finance",
    desc: "Cryptographic data destruction and secure recycling of ATMs, POS, and financial hardware.",
    icon: Landmark,
    illustration: BankIllustration,
    metadata: "SYS-03: FIN/SECURE",
  },
  {
    id: "04",
    title: "Corporate & Enterprise",
    desc: "Lifecycle management for office electronics, laptops, desktops, and communication arrays.",
    icon: Laptop,
    illustration: CorpIllustration,
    metadata: "SYS-04: ENTERPRISE/IT",
  },
  {
    id: "05",
    title: "Manufacturing & Industrial",
    desc: "Recycling of PLCs, industrial control panels, motors, and heavy automation electronics.",
    icon: Factory,
    illustration: MfgIllustration,
    metadata: "SYS-05: HEAVY/AUTO",
  },
  {
    id: "06",
    title: "Education & Universities",
    desc: "Bulk recycling programs for campus computer labs, smart boards, and research hardware.",
    icon: GraduationCap,
    illustration: EduIllustration,
    metadata: "SYS-06: ACADEMIC/LAB",
  },
  {
    id: "07",
    title: "Retail & Supermarkets",
    desc: "Management of barcode scanners, receipt printers, digital signage, and POS systems.",
    icon: Store,
    illustration: RetailIllustration,
    metadata: "SYS-07: POS/SIGNAGE",
  },
  {
    id: "08",
    title: "E-Commerce & Logistics",
    desc: "Disposal of warehouse automation tech, handheld scanners, and sorting equipment.",
    icon: Package,
    illustration: LogisticsIllustration,
    metadata: "SYS-08: WAREHOUSE/LOG",
  },
  {
    id: "09",
    title: "Government & Public Sector",
    desc: "High-security destruction and recycling for confidential infrastructure and servers.",
    icon: Building,
    illustration: GovIllustration,
    metadata: "SYS-09: SEC/PUBLIC",
  },
  {
    id: "10",
    title: "Hospitality & Aviation",
    desc: "Recycling of hotel technology, airport kiosks, display systems, and check-in electronics.",
    icon: Plane,
    illustration: HospIllustration,
    metadata: "SYS-10: TRAVEL/HOSP",
  },
];

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenPickup }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // High-performance scroll tracking via Framer Motion
  // Replaces expensive React state updates on every scroll event
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Add a slight spring physics to the progress bar for smoothness
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [isHoveringRail, setIsHoveringRail] = useState(false);

  // Throttled / Managed Custom Wheel Scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Bail early if not hovering or mostly horizontal
      if (!isHoveringRail || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const isAtStart = el.scrollLeft <= 0;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      // Allow natural vertical page scroll at boundaries
      if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      
      // Use RequestAnimationFrame to prevent blocking main thread
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          el.scrollLeft += e.deltaY;
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    // Use passive: false to allow e.preventDefault(), but it's only active when hovering
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isHoveringRail]);

  const scrollBy = (direction: 1 | -1) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
    }
  };

  return (
    <section id="industries" className="relative w-full py-24 sm:py-32 bg-[#F7F9F6] border-b border-[#E3E8E4] overflow-hidden">
      
      {/* Optimized Background Elements (Removed heavy blurs) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00264A04_1px,transparent_1px),linear-gradient(to_bottom,#00264A04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
              <span>Industries We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight leading-[1.15] mb-6">
              Built for the <span className="text-[#629A13] italic font-normal">Real World.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#5E6672] font-sans leading-relaxed">
              From enterprise technology and healthcare to manufacturing, government, retail, and logistics, ArkaArya delivers responsible e-waste solutions across complex operating environments.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex flex-col items-end gap-2 text-right"
          >
            <span className="text-[#00264A] text-xs font-bold uppercase tracking-widest">
              ← Drag to explore →
            </span>
            <div className="w-32 h-1 bg-[#E3E8E4] rounded-full overflow-hidden origin-left">
              <motion.div 
                className="h-full bg-[#629A13] w-full origin-left" 
                style={{ scaleX: smoothProgress }} 
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Horizontal Scrolling Rail */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full relative"
        onMouseEnter={() => setIsHoveringRail(true)}
        onMouseLeave={() => setIsHoveringRail(false)}
      >
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 sm:px-8 lg:px-10 pb-8 cursor-grab active:cursor-grabbing will-change-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((ind) => (
            <IndustryCard key={ind.id} ind={ind} />
          ))}
        </div>
      </motion.div>

      {/* Bottom Navigation Controls */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10 mt-2">
        <div className="flex items-center justify-between border-t border-[#E3E8E4] pt-6">
          <span className="text-sm font-serif font-bold text-[#00264A]">01</span>
          
          <div className="flex-1 mx-6 h-px bg-[#E3E8E4] relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#629A13] w-full origin-left"
              style={{ scaleX: smoothProgress }}
            />
          </div>
          
          <span className="text-sm font-serif font-bold text-[#00264A] mr-8">10</span>

          <div className="flex gap-2">
            <button 
              onClick={() => scrollBy(-1)}
              className="w-10 h-10 rounded-full border border-[#E3E8E4] bg-white text-[#00264A] flex items-center justify-center hover:bg-[#F7F9F6] hover:border-[#629A13] hover:text-[#629A13] transition-all"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button 
              onClick={() => scrollBy(1)}
              className="w-10 h-10 rounded-full border border-[#E3E8E4] bg-white text-[#00264A] flex items-center justify-center hover:bg-[#F7F9F6] hover:border-[#629A13] hover:text-[#629A13] transition-all"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default IndustriesSection;
