"use client";

import React from "react";
import { ArrowRight, Sparkles, Code, Users, Leaf } from "lucide-react";

interface HeroProps {
  onOpenPickup?: () => void;
  onOpenCalculator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPickup = () => {},
  onOpenCalculator = () => {},
}) => {
  return (
    <section 
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] bg-white overflow-hidden flex items-center pt-8 pb-10 border-b border-[#E3E8E4]" 
      id="home"
    >
      {/* 
        Full Panoramic Banner Image
      */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/hero.jpeg"
          alt="ArkaArya Circular Economy & Clean Energy"
          className="w-full h-full object-cover object-[center_right] lg:object-right"
        />
        {/* Gradient overlay to ensure text readability on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent lg:from-white/80 lg:via-white/25 lg:to-transparent"></div>
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl">
          
          {/* Eyebrow Badge in Clean Neutral & Eco Green */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E3E8E4] text-[#00264A] text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#629A13] animate-pulse" />
            <span>Sustainable Circular Economy</span>
          </div>

          {/* Editorial Headline in Deep Blue & Eco Green Accent */}
          <h1 
            className="text-[#00264A] font-bold tracking-tight mb-3 font-serif leading-[1.1]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.6rem)"
            }}
          >
            Turn Old Tech. <br />
            <span className="text-[#629A13] italic font-normal">Revive</span> <br />
            Our Planet.
          </h1>

          {/* Subtitle in Slate/Gray Secondary Text */}
          <p 
            className="text-[#5E6672] text-sm sm:text-base leading-relaxed mb-4 max-w-sm sm:max-w-md font-sans"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Preserving nature, responsibly recycling electronic waste, and recovering critical raw materials for a sustainable circular future.
          </p>

          {/* Service Icon Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
            {[
              { icon: <span className="text-base">♻</span>, label: 'E-Waste' },
              { icon: <span className="text-base">↻</span>, label: 'Recycling & Circular Economy' },
              { icon: <span className="text-base">☀</span>, label: 'Renewable' },
              { icon: <Code size={14} className="text-[#629A13]" />, label: 'IT Consulting' },
              { icon: <Users size={14} className="text-[#629A13]" />, label: 'Workforce' },
              { icon: <Leaf size={14} className="text-[#629A13]" />, label: 'Bio' },
            ].map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-[#00264A] bg-white/90 border border-[#E3E8E4] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
                <span className="text-[#629A13] leading-none">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Action Buttons in Deep Blue & Eco Green */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={onOpenPickup}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 border border-[#629A13]"
            >
              <span>Schedule Pickup</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#00264A] font-semibold text-xs sm:text-sm border border-[#00264A]/25 shadow-sm transition-all duration-200 active:scale-95"
            >
              <Sparkles size={16} className="text-[#629A13]" />
              <span>Calculate Impact</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
