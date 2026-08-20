"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, Users, Leaf } from "lucide-react";

interface HeroProps {
  onOpenCalculator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator = () => {},
}) => {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center border-b border-[#E3E8E4]"
      style={{ minHeight: "clamp(580px, 80vh, 720px)" }}
      id="home"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/hero.jpeg"
          alt="ArkaArya Circular Economy & Clean Energy"
          className="w-full h-full object-cover object-[85%_center] lg:object-[center_right]"
        />
        {/* Subtle mobile-only gradient for readability, without heavy dark overlay */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(248, 250, 247, 0.98) 0%, rgba(248, 250, 247, 0.85) 50%, rgba(248, 250, 247, 0) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[16px] min-[390px]:px-[20px] lg:px-12 py-[48px] lg:py-0 flex flex-col justify-center min-h-[590px] lg:min-h-0">
        <div className="w-full max-w-[100%] lg:max-w-lg xl:max-w-2xl flex flex-col items-start">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#E3E8E4] bg-white/70 mb-[18px] sm:mb-4 shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#629A13] animate-pulse flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#00264A]">
              Sustainable Circular Economy
            </span>
          </div>

          {/* Headline — controlled line breaks */}
          <h1
            className="font-bold tracking-tight text-[#00264A] mb-[16px] sm:mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(38px, 9vw, 3.8rem)",
              lineHeight: "1.02"
            }}
          >
            Turn Old Tech.<br />
            <span style={{ color: "#629A13", fontStyle: "italic", fontWeight: 400 }}>
              Revive
            </span><br />
            Our Planet.
          </h1>

          {/* Subtitle */}
          <p
            className="text-[13.5px] sm:text-base leading-[1.55] sm:leading-relaxed mb-[18px] sm:mb-6 text-[#4A5568] sm:text-[#5E6672] max-w-[330px] sm:max-w-md font-sans"
          >
            Preserving nature, responsibly recycling electronic waste, and recovering
            critical raw materials for a sustainable circular future.
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap items-center gap-[7px] sm:gap-2 mb-[20px] sm:mb-8 max-w-[100%] sm:max-w-[480px]">
            {[
              { icon: <span className="text-[12px] sm:text-sm">♻</span>, label: "E-Waste" },
              { icon: <span className="text-[12px] sm:text-sm">↻</span>, label: "Recycling & Circular Economy" },
              { icon: <span className="text-[12px] sm:text-sm">☀</span>, label: "Renewable" },
              { icon: <Code size={12} className="sm:w-3.5 sm:h-3.5" />, label: "IT Consulting" },
              { icon: <Users size={12} className="sm:w-3.5 sm:h-3.5" />, label: "Workforce" },
              { icon: <Leaf size={12} className="sm:w-3.5 sm:h-3.5" />, label: "Bio" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[10px] sm:text-[13px] font-semibold text-[#00264A] bg-white border border-[#E3E8E4] px-[9px] py-[6px] sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg shadow-sm"
              >
                <span className="text-[#629A13] leading-none">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons — stacked on mobile, inline on sm+ */}
          <div className="flex flex-col sm:flex-row items-center gap-[10px] sm:gap-3.5 w-full sm:w-auto">
            <Link
              href="/pickup"
              className="inline-flex w-full max-w-[305px] sm:max-w-none sm:w-auto items-center justify-center gap-2 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold transition-all duration-200 active:scale-95 border border-[#629A13] h-[46px] sm:h-auto px-6 sm:py-3.5 text-[13px] sm:text-sm"
            >
              <span>Schedule Pickup</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={onOpenCalculator}
              className="inline-flex w-full max-w-[305px] sm:max-w-none sm:w-auto items-center justify-center gap-2 rounded-full text-[#00264A] font-semibold border border-[#E3E8E4] bg-white hover:bg-gray-50 shadow-sm transition-all duration-200 active:scale-95 h-[46px] sm:h-auto px-6 sm:py-3.5 text-[13px] sm:text-sm"
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
