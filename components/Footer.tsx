"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp, Leaf, ShieldCheck, Recycle, Globe, Award } from "lucide-react";

interface FooterProps {
  onOpenPickup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPickup = () => {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#00264A] text-white pt-16 pb-12 border-t-2 border-[#629A13] relative overflow-hidden" id="footer">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#629A13]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#053766]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Enterprise Callout Banner */}
        <div className="bg-[#001A33] rounded-3xl p-8 sm:p-10 mb-16 border border-[#053766] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#053766] text-[#629A13] text-xs font-semibold uppercase tracking-wider">
              <Leaf size={14} />
              <span>Certified Sustainable Recycling</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Ready to eliminate electronic waste liability responsibly?
            </h3>
            <p className="text-sm text-[#E6ECF2] max-w-xl">
              Schedule certified reverse logistics with legal CPCB Form-6 manifests, zero-landfill processing, and NIST 800-88 data sanitization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPickup}
              className="px-8 py-4 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold text-sm btn-eco-glow transition-all active:scale-95 flex items-center gap-2 border border-[#629A13]"
            >
              <Recycle size={18} />
              <span>Schedule Enterprise Pickup</span>
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-xl flex items-center justify-center shadow-sm border border-[#E3E8E4]">
                <img 
                  src="/ArkaArya_Logo.png" 
                  alt="ArkaArya Logo" 
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-[#E6ECF2] leading-relaxed max-w-sm">
              ArkaArya Private Limited is India's leading technology-driven e-waste recycler and circular economy enterprise, committed to closed-loop urban mining and zero-landfill operations.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001A33] border border-[#053766] text-[#629A13] text-xs font-semibold">
                <ShieldCheck size={14} className="text-[#629A13]" />
                <span>CPCB Authorized</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001A33] border border-[#053766] text-[#629A13] text-xs font-semibold">
                <Globe size={14} className="text-[#629A13]" />
                <span>ISO 14001:2015</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001A33] border border-[#053766] text-[#629A13] text-xs font-semibold">
                <Award size={14} className="text-[#629A13]" />
                <span>NIST 800-88</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#629A13] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E6ECF2]">
              <li>
                <Link href="#home" className="hover:text-[#629A13] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#629A13] transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#629A13] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#lifecycle" className="hover:text-[#629A13] transition-colors">
                  Recycling Lifecycle
                </Link>
              </li>
              <li>
                <Link href="#impact" className="hover:text-[#629A13] transition-colors">
                  Measurable Impact
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-[#629A13] transition-colors">
                  Trust & Endorsements
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#629A13] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#629A13] mb-4">
              Circular Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E6ECF2]">
              <li>Corporate ITAD Logistics</li>
              <li>E-Waste Rules 2022 EPR</li>
              <li>NIST 800-88 Data Shredding</li>
              <li>Closed-Loop Urban Mining</li>
              <li>Rare Earth Metal Recovery</li>
              <li>Audited Carbon Credits</li>
            </ul>
          </div>

          {/* Col 4: Corporate Headquarters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#629A13] mb-4">
              Corporate Office
            </h4>
            <div className="space-y-3.5 text-sm text-[#E6ECF2]">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-[#629A13] shrink-0 mt-1" />
                <span className="leading-snug">
                  Plot No: 25, Divyasree trinity, 5 & 6, Hitech City Main Rd, Phase 2, HITEC City, Hyderabad, Telangana 500081
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#629A13] shrink-0" />
                <a href="mailto:contact@arkaarya.com" className="hover:text-[#629A13] transition-colors">
                  contact@arkaarya.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#629A13] shrink-0" />
                <a href="tel:9908990874" className="hover:text-[#629A13] transition-colors">
                  +91 9908990874
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenPickup}
                  className="w-full py-2.5 px-4 rounded-full bg-[#629A13] hover:bg-[#528210] text-white text-xs font-semibold transition-all shadow-md text-center btn-eco-glow"
                >
                  Book E-Waste Pickup
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#053766] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E6ECF2]">
          <div>
            © {new Date().getFullYear()} ArkaArya Private Limited. All rights reserved. Sustaining Nature. Empowering People. Enriching Society.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#E6ECF2]">
              Preserving Planet Earth with Zero-Landfill Integrity
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#001A33] hover:bg-[#629A13] text-white transition-colors border border-[#053766]"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
