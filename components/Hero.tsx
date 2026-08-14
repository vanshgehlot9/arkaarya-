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
      className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] bg-white overflow-hidden flex items-center pt-12 sm:pt-16 lg:pt-12 pb-12 sm:pb-16 border-b border-[#E3E8E4]" 
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
        {/* Crisp text contrast and top frosted header blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/80 to-transparent lg:w-[65%] w-full" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/90 via-white/40 to-transparent" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="max-w-md sm:max-w-lg lg:max-w-xl">
          
          {/* Eyebrow Badge in Clean Neutral & Eco Green */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E3E8E4] text-[#00264A] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#629A13] animate-pulse" />
            <span>Sustainable Circular Economy</span>
          </div>

          {/* Editorial Headline in Deep Blue & Eco Green Accent */}
          <h1 
            className="text-[#00264A] font-bold tracking-tight mb-4 font-serif leading-[1.1]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 4.2vw, 3.9rem)"
            }}
          >
            Turn Old Tech. <br />
            <span className="text-[#629A13] italic font-normal">Revive</span> <br />
            Our Planet.
          </h1>

          {/* Subtitle in Slate/Gray Secondary Text */}
          <p 
            className="text-[#5E6672] text-sm sm:text-base leading-relaxed mb-6 max-w-sm sm:max-w-md font-sans"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Preserving nature, responsibly recycling electronic waste, and recovering critical raw materials for a sustainable circular future.
          </p>

          {/* New Icon Array */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#00264A] bg-[#F8FAF7] border border-[#E3E8E4] px-3.5 py-2 rounded-lg shadow-sm">
              <Code size={16} className="text-[#629A13]" />
              IT Consulting & Software Solutions
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#00264A] bg-[#F8FAF7] border border-[#E3E8E4] px-3.5 py-2 rounded-lg shadow-sm">
              <Users size={16} className="text-[#629A13]" />
              Workforce Solutions
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#00264A] bg-[#F8FAF7] border border-[#E3E8E4] px-3.5 py-2 rounded-lg shadow-sm">
              <Leaf size={16} className="text-[#629A13]" />
              Bio Products
            </div>
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
