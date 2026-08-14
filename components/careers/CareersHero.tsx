"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export const CareersHero = () => {
  const scrollToPositions = () => {
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhy = () => {
    document.getElementById("why-arkaarya")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-[120px] pb-20 lg:pt-[160px] lg:pb-32 overflow-hidden bg-[#F8FAF7]">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#629A13]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#00264A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-[#629A13] font-bold tracking-widest text-sm uppercase">
                Careers at ArkaArya
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00264A] leading-tight">
                Build Work <br className="hidden md:block" />
                <span className="text-[#629A13]">That Matters.</span>
              </h1>
              <p className="text-lg text-[#4A5568] max-w-lg leading-relaxed">
                Join a team working across sustainability, technology, renewable energy, and responsible innovation to create lasting impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={scrollToPositions}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00264A] text-white rounded-full font-semibold hover:bg-[#001A33] transition-all group"
              >
                View Open Positions 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToWhy}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00264A] border border-[#E3E8E4] rounded-full font-semibold hover:bg-[#F2F5F3] transition-all"
              >
                Why ArkaArya?
                <ChevronDown size={18} />
              </button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] shadow-2xl border-4 border-white">
              <img 
                src="/social_team.jpg" 
                alt="ArkaArya Team Collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00264A]/40 to-transparent" />
            </div>
            
            {/* Floating Element */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-[#E3E8E4] flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#629A13]/10 flex items-center justify-center text-[#629A13] font-bold text-xl">
                0
              </div>
              <div>
                <p className="text-sm font-bold text-[#00264A]">Zero Landfill</p>
                <p className="text-xs text-[#4A5568]">Commitment</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
