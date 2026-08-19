"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Cpu, Users, Globe2, ArrowRight } from "lucide-react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

interface WhyChooseUsProps {
  onOpenPickup?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenPickup = () => {} }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useAutoScroll(scrollContainerRef, 3500);

  const pillars = [
    {
      title: "Sustainability First",
      desc: "Building environmentally responsible solutions.",
      icon: Leaf,
    },
    {
      title: "Technology Driven",
      desc: "Leveraging innovation for business growth.",
      icon: Cpu,
    },
    {
      title: "People Focused",
      desc: "Creating opportunities and empowering communities.",
      icon: Users,
    },
    {
      title: "Future Ready",
      desc: "Delivering scalable solutions for tomorrow's challenges.",
      icon: Globe2,
    },
  ];

  return (
    <section 
      id="why-us" 
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-white border-b border-[#E3E8E4] overflow-hidden"
    >
      {/* Background Ambient Elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#629A13]/05 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#00264A]/04 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span>Why Choose ArkaArya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight leading-[1.15]">
            Why Choose <span className="text-[#629A13] italic font-normal">ArkaArya?</span>
          </h2>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div ref={scrollContainerRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative bg-white border border-[#E3E8E4] rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,38,74,0.06)] hover:border-[#629A13]/30 hover:-translate-y-1 min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#F8FAF7] border border-[#E3E8E4] text-[#00264A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:text-[#629A13] group-hover:border-[#629A13]/20 group-hover:bg-[#EBF5DC] transition-all duration-500">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#00264A] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5E6672] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* OUR COMMITMENT Editorial Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full rounded-[2.5rem] bg-[#001A33] border border-[#00264A] shadow-[0_30px_60px_rgba(0,38,74,0.15)] overflow-hidden text-white"
        >
          {/* Grid Background Removed */}          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#629A13]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

          <div className="relative z-10 p-10 sm:p-16 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side text */}
            <div className="lg:w-1/2 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#629A13]" />
                <span className="text-[10px] font-bold tracking-widest text-[#EBF5DC] uppercase">
                  Our Commitment
                </span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-serif font-bold leading-[1.2] mb-6">
                Creating Sustainable Value <br className="hidden sm:block" />
                <span className="text-[#629A13] italic font-normal">for Generations</span>
              </h3>
              
              <p className="text-[#A1A9B3] text-sm sm:text-base leading-relaxed mb-4">
                ArkaArya is more than a company. It is a commitment to responsible growth, environmental stewardship, technological innovation, and human empowerment.
              </p>
              
              <button
                onClick={onOpenPickup}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#629A13] hover:bg-[#528210] text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(98,154,19,0.3)] group"
              >
                <span>Partner With Us</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side quote box */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 relative">
                {/* Decorative quote mark */}
                <div className="absolute -top-4 -left-2 text-6xl text-[#629A13]/30 font-serif leading-none select-none">
                  "
                </div>
                
                <p className="text-xl sm:text-2xl font-serif leading-relaxed relative z-10 text-white/90">
                  Every initiative we undertake is guided by our purpose: <br /><br />
                  <span className="text-[#EBF5DC] font-bold tracking-wide italic">
                    "Sustaining Nature. Empowering People. Enriching Society."
                  </span>
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
