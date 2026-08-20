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
      className="relative w-full overflow-hidden flex items-center border-b border-[#E3E8E4]"
      style={{ minHeight: "clamp(580px, 80vh, 720px)" }}
      id="home"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/hero.jpeg"
          alt="ArkaArya Circular Economy & Clean Energy"
          className="w-full h-full object-cover object-center lg:object-[center_right]"
        />
        {/* Dark gradient left-to-transparent for text readability — stronger on mobile */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,20,40,0.82) 0%, rgba(0,20,40,0.62) 45%, rgba(0,20,40,0.20) 70%, transparent 90%)",
          }}
        />
        {/* Extra bottom fade on mobile so text doesn't clash with image bottom */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(0,20,40,0.50) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-0">
        <div className="w-full max-w-[520px] lg:max-w-lg xl:max-w-2xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#629A13] animate-pulse flex-shrink-0" />
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-white"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
            >
              Sustainable Circular Economy
            </span>
          </div>

          {/* Headline — controlled line breaks */}
          <h1
            className="font-bold tracking-tight leading-[1.05] mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.3rem, 6vw, 3.6rem)",
              color: "#ffffff",
              textShadow: "0 2px 16px rgba(0,0,0,0.60)",
            }}
          >
            Turn Old Tech.
            <br />
            <span style={{ color: "#8BC34A", fontStyle: "italic", fontWeight: 400 }}>
              Revive
            </span>
            <br />
            Our Planet.
          </h1>

          {/* Subtitle */}
          <p
            className="leading-relaxed mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "#d8ecc8",
              textShadow: "0 1px 8px rgba(0,0,0,0.55)",
              maxWidth: "38ch",
            }}
          >
            Preserving nature, responsibly recycling electronic waste, and recovering
            critical raw materials for a sustainable circular future.
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6" style={{ maxWidth: "360px" }}>
            {[
              { icon: <span>♻</span>, label: "E-Waste" },
              { icon: <span>↻</span>, label: "Recycling & Circular Economy" },
              { icon: <span>☀</span>, label: "Renewable" },
              { icon: <Code size={12} />, label: "IT Consulting" },
              { icon: <Users size={12} />, label: "Workforce" },
              { icon: <Leaf size={12} />, label: "Bio" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 font-semibold"
                style={{
                  fontSize: "11px",
                  color: "#ffffff",
                  textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                }}
              >
                <span style={{ color: "#8BC34A" }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons — stacked on mobile, inline on sm+ */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={onOpenPickup}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold transition-all duration-200 active:scale-95 border border-[#629A13]"
              style={{
                fontSize: "clamp(0.8rem, 2vw, 0.875rem)",
                padding: "12px 24px",
                minHeight: "48px",
                minWidth: "180px",
              }}
            >
              <span>Schedule Pickup</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold border border-white/40 hover:bg-white/10 transition-all duration-200 active:scale-95"
              style={{
                fontSize: "clamp(0.8rem, 2vw, 0.875rem)",
                padding: "12px 24px",
                minHeight: "48px",
              }}
            >
              <Sparkles size={16} style={{ color: "#8BC34A" }} />
              <span>Calculate Impact</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
