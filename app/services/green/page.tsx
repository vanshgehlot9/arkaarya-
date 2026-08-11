"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Recycle, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Leaf, Factory, Laptop } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ArkaAryaGreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar 
        onOpenPickup={() => router.push("/pickup")} 
        onOpenCalculator={() => router.push("/#impact")} 
      />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-24">
          <button 
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E6672] hover:text-[#00264A] transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Homepage
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF5DC] border border-[#629A13]/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#629A13] animate-pulse" />
                <span className="text-[#00264A] text-xs font-bold tracking-widest uppercase">ArkaArya Green</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] leading-[1.1]">
                Zero Landfill. <br />
                <span className="text-[#629A13]">Maximum Circularity.</span>
              </h1>
              <p className="text-[#5E6672] text-lg leading-relaxed max-w-lg">
                We are India's trusted partner for enterprise IT asset disposal, secure data destruction, and Extended Producer Responsibility (EPR) fulfillment.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <button 
                  onClick={() => router.push("/pickup")}
                  className="btn-pill btn-pill-lime"
                >
                  <span className="font-bold">Schedule Enterprise Pickup</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square max-w-[600px] mx-auto"
            >
              <div className="absolute inset-0 bg-[#00264A] rounded-full blur-[100px] opacity-10" />
              <div className="relative w-full h-full bg-white rounded-[3rem] border border-[#E3E8E4] shadow-2xl flex items-center justify-center overflow-hidden">
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Recycle size={300} strokeWidth={0.5} className="text-[#629A13]/10" />
                </motion.div>

                <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <Laptop size={32} className="text-[#00264A]" />
                    <span className="text-sm font-bold text-[#00264A]">IT Asset Disposal</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center mt-12">
                    <ShieldCheck size={32} className="text-[#629A13]" />
                    <span className="text-sm font-bold text-[#00264A]">Data Sanitization</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center -mt-12">
                    <Leaf size={32} className="text-[#629A13]" />
                    <span className="text-sm font-bold text-[#00264A]">EPR Compliance</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <Factory size={32} className="text-[#00264A]" />
                    <span className="text-sm font-bold text-[#00264A]">Urban Mining</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deep Dive Features */}
        <section className="bg-[#00264A] text-white py-24">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">Certified Circular Stewardship</h2>
              <p className="text-[#94a3b8] text-lg">
                We bridge the gap between corporate technology lifecycle management and environmental responsibility, ensuring 100% compliance with CPCB regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Responsible Recycling", desc: "Automated and mechanical separation lines extract precious metals, engineered polymers, and rare earth elements with zero landfill tolerance." },
                { title: "Secure Data Destruction", desc: "Military-grade data wiping (NIST 800-88) and physical shredding of hard drives, ensuring absolute data security and privacy compliance." },
                { title: "ESG & EPR Compliance", desc: "End-to-end management of your Extended Producer Responsibility targets, complete with verifiable Green Certificates and audit trails." }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-[#629A13]/20 text-[#629A13] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-[#94a3b8] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenPickup={() => router.push("/pickup")} />
    </div>
  );
}
