"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Calculator, Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenPickup: () => void;
  onOpenCalculator: () => void;
}

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Industries", href: "#industries" },
  { name: "Who We Are", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Lifecycle", href: "#lifecycle" },
  { name: "Impact", href: "#impact" },
  { name: "Trust & Clients", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenPickup, onOpenCalculator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeItem = navItems.find((item) => item.href === `#${entry.target.id}`);
            if (activeItem) {
              setActive(activeItem.name);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 
        FLOATING DUAL-CAPSULE SYSTEM
        Logo is completely separate in its own prominent capsule on the left.
        Navigation & Actions are in a dedicated interactive glass capsule on the right.
      */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-8 pt-3.5 sm:pt-5 pointer-events-none transition-all duration-300">
        
        {/* ========================================================= */}
        {/* 1. SEPARATE STANDALONE BIG LOGO CAPSULE (Left)           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <Link
            href="#home"
            onClick={() => setActive("Home")}
            className="flex items-center group transition-transform duration-300 active:scale-95"
          >
            <div
              className={`bg-white/95 backdrop-blur-2xl border border-[#00264A]/12 rounded-full px-5 py-2.5 sm:px-7 sm:py-3 shadow-[0_12px_35px_rgba(0,38,74,0.08)] hover:shadow-[0_16px_45px_rgba(0,38,74,0.15)] hover:border-[#629A13]/50 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center ${
                scrolled ? "py-2 sm:py-2.5 px-4 sm:px-6" : ""
              }`}
            >
              {/* BIG CLEAR LOGO */}
              <img
                src="/ArkaArya_Logo.png"
                alt="ArkaArya Private Limited"
                className="h-12 sm:h-15 md:h-18 w-auto object-contain transition-all duration-300 drop-shadow-xs"
              />
            </div>
          </Link>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. SEPARATE STANDALONE NAVIGATION & ACTION CAPSULE (Right) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full transition-all duration-300 flex items-center gap-3 border ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-[#00264A]/12 shadow-[0_16px_45px_rgba(0,38,74,0.10)] py-2 sm:py-2.5 px-4 sm:px-6"
              : "bg-white/90 backdrop-blur-xl border-[#00264A]/09 shadow-[0_10px_35px_rgba(0,38,74,0.06)] py-2.5 sm:py-3 px-4 sm:px-6"
          }`}
        >
          {/* DESKTOP NAVIGATION WITH MAGNETIC HOVER GLIDER */}
          <nav
            className="hidden xl:flex items-center gap-1 relative py-0.5 px-1 rounded-full"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => {
              const isActive = active === item.name;
              const isHovered = hovered === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  onMouseEnter={() => setHovered(item.name)}
                  className={`relative px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-200 rounded-full select-none ${
                    isActive
                      ? "text-[#629A13] font-semibold"
                      : "text-[#00264A] hover:text-[#00264A]"
                  }`}
                >
                  {/* Magnetic Hover Glider */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHoverGlider"
                      className="absolute inset-0 bg-[#00264A]/06 rounded-full z-0 border border-[#00264A]/10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  {/* Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-[#EBF5DC] rounded-full z-0 border border-[#629A13]/35 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#629A13] animate-pulse" />}
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Vertical Separator */}
          <div className="hidden xl:block w-[1px] h-5 bg-[#E3E8E4] mx-0.5" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Secondary CTA: Ghost Impact Calculator */}
            <button
              onClick={onOpenCalculator}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-[13px] font-semibold text-[#00264A] bg-[#F8FAF7] hover:bg-[#F2F5F3] border border-[#E3E8E4] hover:border-[#00264A]/25 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs group"
              title="Calculate Carbon & Mineral Impact"
            >
              <Calculator size={15} className="text-[#629A13] group-hover:rotate-12 transition-transform duration-300" />
              <span>Impact Calculator</span>
            </button>

            {/* Primary CTA: Premium Eco Green Rounded Button with Gloss Hover */}
            <button
              onClick={onOpenPickup}
              className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#629A13] to-[#528210] hover:from-[#528210] hover:to-[#456e0d] text-white font-semibold text-xs sm:text-[13.5px] btn-eco-glow hover:-translate-y-0.5 transition-all duration-300 active:scale-95 border border-[#629A13]/60 group shadow-sm"
            >
              {/* Shimmer Light Beam Effect on Hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              
              <UploadCloud size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Book a Pickup</span>
              <ArrowRight size={14} className="opacity-80 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenu(true)}
              className="xl:hidden p-2 rounded-full text-[#00264A] hover:bg-[#F2F5F3] transition-colors border border-[#E3E8E4]"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Premium Mobile Slide-Out Drawer Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="absolute inset-0 bg-[#001A33]/60 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl border-l border-[#E3E8E4] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
            >
              <div>
                {/* Header with Big Logo */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E3E8E4]">
                  <div className="py-1">
                    <img
                      src="/ArkaArya_Logo.png"
                      alt="ArkaArya Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="p-2 rounded-full text-[#5E6672] hover:text-[#00264A] hover:bg-[#F2F5F3] transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = active === item.name;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          setActive(item.name);
                          setMobileMenu(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-[#EBF5DC] text-[#629A13] border border-[#629A13]/30"
                            : "text-[#00264A] hover:bg-[#F8FAF7]"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#629A13]" />
                        ) : (
                          <ArrowRight size={16} className="text-[#5E6672] opacity-40" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Actions */}
              <div className="pt-6 border-t border-[#E3E8E4] space-y-3">
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    onOpenCalculator();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#F8FAF7] hover:bg-[#F2F5F3] text-[#00264A] font-semibold text-sm border border-[#E3E8E4] transition-colors"
                >
                  <Sparkles size={16} className="text-[#629A13]" />
                  <span>Simulate ESG Impact</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenu(false);
                    onOpenPickup();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold text-sm btn-eco-glow transition-all active:scale-95 border border-[#629A13]"
                >
                  <UploadCloud size={18} />
                  <span>Book Certified Pickup</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
