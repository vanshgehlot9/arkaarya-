"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Impact", href: "/#impact" },
  { name: "Who We Are", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Social Activities", href: "/#social-activities" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/#contact" },
];

interface NavbarProps {
  onOpenPickup?: () => void;
  onOpenCalculator?: () => void;
}

export const Navbar = ({ onOpenPickup = () => { }, onOpenCalculator = () => { } }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll for sticky background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const activeId = visibleSections[0].target.id;
          const activeItem = navLinks.find(
            (item) => item.href === `#${activeId}` || (activeId === "home" && item.href === "/")
          );
          if (activeItem) {
            setActive(activeItem.name);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    navLinks.forEach((item) => {
      if (item.href.startsWith("#")) {
        try {
          const element = document.querySelector(item.href);
          if (element) {
            observer.observe(element);
          }
        } catch (e) {
          // ignore invalid selectors
        }
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 h-[80px] md:h-[90px] transition-all duration-500 bg-white shadow-sm border-b border-[#E3E8E4]",
      scrolled ? "shadow-md" : ""
    )}>
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        {/* Logo - Aligned Left */}
        <Link href="/" onClick={() => setActive("Home")} className="flex items-center gap-3 z-50 shrink-0 group">
          <div className="relative h-12 md:h-14 transition-transform duration-500 group-hover:scale-105">
            <img
              src="/ArkaAryaPvtLtd_Logo_v3.0.png"
              alt="ArkaArya Private Limited"
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Centered (Wait, might not fit centered with actions on right. Using standard alignment) */}
        <nav className="hidden xl:flex items-center gap-4">
          {navLinks.map((link) => {
            const isActive = active === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActive(link.name)}
                className={cn(
                  "relative px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap rounded-full",
                  isActive ? "text-[#629A13]" : "text-[#00264A] hover:bg-[#F8FAF7]"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#629A13] rounded-t-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions - Aligned Right */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#00264A] bg-[#F8FAF7] hover:bg-[#F2F5F3] border border-[#E3E8E4] hover:border-[#00264A]/25 transition-all duration-300"
          >
            <Sparkles size={15} className="text-[#629A13]" />
            <span>Impact Calculator</span>
          </button>

          <button
            onClick={onOpenPickup}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#629A13] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#528210] active:scale-95"
          >
            <UploadCloud size={16} />
            Book a Pickup
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-4 z-50">
          <button
            className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/90 shadow-sm border border-[#E3E8E4] backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-5 h-[1.5px] bg-[#00264A] transition-all duration-300", isOpen ? "rotate-45 translate-y-[1.5px]" : "-translate-y-1")} />
            <span className={cn("block w-5 h-[1.5px] bg-[#00264A] transition-all duration-300", isOpen ? "opacity-0" : "opacity-100")} />
            <span className={cn("block w-5 h-[1.5px] bg-[#00264A] transition-all duration-300", isOpen ? "-rotate-45 -translate-y-[1.5px]" : "translate-y-1")} />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-[80px] md:top-[90px] left-0 right-0 border-b border-[#E3E8E4] bg-white p-6 shadow-2xl xl:hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = active === link.name;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActive(link.name);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                        isActive ? "bg-[#EBF5DC] text-[#629A13]" : "text-[#00264A] hover:bg-[#F8FAF7]"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-[#E3E8E4]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCalculator();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#E3E8E4] bg-[#F8FAF7] px-6 py-3.5 text-center text-sm font-semibold text-[#00264A] transition-all hover:bg-[#F2F5F3]"
                >
                  <Sparkles size={16} className="text-[#629A13]" /> Simulate ESG Impact
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPickup();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#629A13] bg-[#629A13] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#528210]"
                >
                  <UploadCloud size={18} /> Book Certified Pickup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
