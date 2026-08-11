"use client";

import React from "react";
import { ShieldCheck, Award, Lock, FileText, CheckCircle2, Star, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const certifications = [
    {
      icon: ShieldCheck,
      title: "CPCB Authorized",
      subtitle: "Ministry of Environment & Climate",
    },
    {
      icon: Award,
      title: "ISO 14001:2015",
      subtitle: "Environmental Management System",
    },
    {
      icon: Lock,
      title: "ISO 27001:2022",
      subtitle: "Information Security Standard",
    },
    {
      icon: FileText,
      title: "NIST 800-88",
      subtitle: "Cryptographic Data Sanitization",
    },
  ];

  const testimonials = [
    {
      quote:
        "ArkaArya transformed our nationwide IT decommissioning workflow. Their doorstep serialized barcode scanning and NIST 800-88 certificates gave our executive board absolute data security assurance.",
      author: "Vikram Malhotra",
      role: "Chief Technology Officer",
      company: "Apex Financial Technologies",
    },
    {
      quote:
        "Fulfilling our annual statutory EPR obligations was previously a major friction point. ArkaArya's automated CPCB ledger filing and mass-balance certificate transfers streamlined our entire ESG reporting cycle.",
      author: "Priya Sundaram",
      role: "VP of Sustainability & ESG",
      company: "Cognitive Cloud Solutions",
    },
    {
      quote:
        "The zero-landfill assurance and transparent hydrometallurgical recovery reporting set ArkaArya far above generic recyclers. They are true pioneers of closed-loop industrial sustainability in India.",
      author: "Arun Deshmukh",
      role: "Head of Infrastructure & Facilities",
      company: "Zenith Global Health Network",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-20 bg-[#F8FAF7] border-b border-[#E3E8E4]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Compliance & Standards Strip */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#629A13] uppercase tracking-widest block mb-2">
              Statutory Governance & Accreditations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A] tracking-tight">
              Rigorous Industrial Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E3E8E4] flex items-center gap-4 shadow-sm hover:border-[#629A13]/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E3E8E4] text-[#629A13] flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#00264A] font-display">
                      {cert.title}
                    </div>
                    <div className="text-xs text-[#5E6672]">
                      {cert.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#629A13] uppercase tracking-widest block mb-2">
              Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F8FAF7] border border-[#E3E8E4] shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#629A13]/40"
              >
                <div>
                  {/* Quote Icon & Stars in Eco Green */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote size={28} className="text-[#629A13] opacity-80" />
                    <div className="flex items-center gap-1 text-[#629A13]">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} size={14} className="fill-[#629A13]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base text-[#121212] leading-relaxed mb-6 font-sans">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-[#E3E8E4] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00264A] text-white font-bold text-xs flex items-center justify-center font-mono">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#00264A]">
                      {t.author}
                    </div>
                    <div className="text-xs text-[#5E6672]">
                      {t.role}, <span className="text-[#00264A] font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
