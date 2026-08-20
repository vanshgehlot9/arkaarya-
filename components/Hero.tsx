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
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] overflow-hidden flex items-center pt-8 pb-10 border-b border-[#E3E8E4]"
      id="home"
    >
      {/* Full Panoramic Banner Image — no overlay */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/hero.jpeg"
          alt="ArkaArya Circular Economy & Clean Energy"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="max-w-md sm:max-w-lg">

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold tracking-wider uppercase mb-3"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            <span className="w-2 h-2 rounded-full bg-[#629A13] animate-pulse" />
            <span>Sustainable Circular Economy</span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold tracking-tight mb-3 leading-[1.1]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
              color: "#ffffff",
              textShadow: "0 2px 12px rgba(0,0,0,0.55)",
            }}
          >
            Turn Old Tech. <br />
            <span style={{ color: "#8BC34A", fontStyle: "italic", fontWeight: 400 }}>Revive</span> <br />
            Our Planet.
          </h1>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base leading-relaxed mb-4 max-w-sm sm:max-w-md"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#e8f0e0",
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            Preserving nature, responsibly recycling electronic waste, and recovering critical raw materials for a sustainable circular future.
          </p>

          {/* Service Icon Labels */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 mb-6 max-w-sm">
            {[
              { icon: <span>♻</span>, label: "E-Waste" },
              { icon: <span>↻</span>, label: "Recycling & Circular Economy" },
              { icon: <span>☀</span>, label: "Renewable" },
              { icon: <Code size={13} />, label: "IT Consulting" },
              { icon: <Users size={13} />, label: "Workforce" },
              { icon: <Leaf size={13} />, label: "Bio" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[12px] font-semibold"
                style={{ color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
              >
                <span style={{ color: "#8BC34A" }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm border border-white/40 hover:bg-white/10 transition-all duration-200 active:scale-95"
            >
              <Sparkles size={16} className="text-[#8BC34A]" />
              <span>Calculate Impact</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
