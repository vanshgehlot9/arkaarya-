"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Recycle } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

interface FooterProps {
  onOpenPickup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPickup = () => {} }) => {
  const [legalLinks, setLegalLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchLegalLinks = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("legal_documents")
          .select("title, slug")
          .eq("status", "published")
          .order("title", { ascending: true });
        
        if (!error && data) {
          setLegalLinks(data);
        }
      } catch (err) {
        console.error("Failed to fetch legal links:", err);
      }
    };
    fetchLegalLinks();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#00192E] text-white" id="footer">

      {/* ══ CTA Banner ══ */}
      <div className="border-b border-[#0D3A5C]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#629A13] mb-2">
              Certified Sustainable Recycling
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-white max-w-lg leading-snug">
              Ready to eliminate electronic waste liability responsibly?
            </h3>
            <p className="text-sm text-[#7A9AB4] mt-1 max-w-md">
              CPCB Form-6 manifests · Zero-landfill processing · NIST 800-88 data sanitization
            </p>
          </div>
          <button
            onClick={onOpenPickup}
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg bg-[#629A13] hover:bg-[#528210] text-white text-sm font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <Recycle size={15} />
            Schedule Enterprise Pickup
          </button>
        </div>
      </div>

      {/* ══ Main footer body ══ */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="inline-block bg-white rounded-lg p-2">
              <img src="/ArkaAryaPvtLtd_Logo_v3.0.png" alt="ArkaArya" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-sm text-[#7A9AB4] leading-relaxed">
              India's leading technology-driven e-waste recycler and circular economy enterprise — committed to zero-landfill operations.
            </p>

            {/* Certifications */}
            <div className="flex flex-col gap-1.5">
              {["CPCB Authorized", "ISO 14001:2015", "NIST 800-88"].map((cert) => (
                <span key={cert} className="flex items-center gap-2 text-xs text-[#629A13] font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cert}
                </span>
              ))}
            </div>

            {/* Social Icons — real SVGs */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.facebook.com/share/19CXaupxN8/"
                target="_blank" rel="noreferrer"
                aria-label="ArkaArya on Facebook"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-[#0D3A5C] bg-[#091D2E] hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
              >
                {/* Facebook SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/arkaarya_official?igsh=OTFsNHhpZGgyczR6"
                target="_blank" rel="noreferrer"
                aria-label="ArkaArya on Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-[#0D3A5C] bg-[#091D2E] hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#515BD4] hover:border-transparent transition-all duration-200"
              >
                {/* Instagram SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#3B5A72] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Who We Are", href: "/#about" },
                { name: "Our Services", href: "/#services" },
                { name: "EPR Services", href: "/services/epr" },
                { name: "Measurable Impact", href: "/#impact" },
                { name: "Social Activities", href: "/#social-activities" },
                { name: "Careers", href: "/careers" },
                { name: "Contact Us", href: "/#contact" },
                { name: "News Feed", href: "/#news-feed" },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-[#7A9AB4] hover:text-white transition-colors duration-150">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#3B5A72] mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((l: any) => (
                <li key={l.slug}>
                  <Link href={`/legal/${l.slug}`} className="text-sm text-[#7A9AB4] hover:text-white transition-colors duration-150">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#3B5A72] mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@arkaarya.com" className="group flex items-start gap-3">
                  <span className="mt-0.5 text-[#629A13]">
                    {/* Mail SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span className="text-sm text-[#7A9AB4] group-hover:text-white transition-colors">contact@arkaarya.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+919908990874" className="group flex items-start gap-3">
                  <span className="mt-0.5 text-[#629A13]">
                    {/* Phone SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 11.94 19.79 19.79 0 0 1 1.07 3.3 2 2 0 0 1 3.04 1.07h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 23 17.92z"/>
                    </svg>
                  </span>
                  <span className="text-sm text-[#7A9AB4] group-hover:text-white transition-colors">+91 9908990874</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#629A13]">
                    {/* MapPin SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="text-sm text-[#7A9AB4] leading-relaxed">
                    Plot No. 25, Divyasree Trinity, HITEC City, Hyderabad, Telangana 500081
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ══ Bottom Bar ══ */}
      <div className="border-t border-[#0D3A5C] bg-[#000F1C]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3B5A72]">
          <span>© {new Date().getFullYear()} ArkaArya Private Limited. All rights reserved.</span>

          <span className="flex items-center gap-1">
            Made with{" "}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#629A13" className="mx-0.5" aria-hidden>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>{" "}
            <a href="https://www.aatomate.com" target="_blank" rel="noreferrer" className="text-[#629A13] hover:text-[#7DC018] font-semibold transition-colors">
              aatomate
            </a>
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
            aria-label="Back to top"
          >
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#629A13] transition-colors" aria-hidden>
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
