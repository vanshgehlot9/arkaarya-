"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, ArrowLeft, ArrowRight, CheckCircle2, Code2, Network, BrainCircuit, Database } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ArkaAryaQuantum() {
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
                <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                <span className="text-[#00264A] text-xs font-bold tracking-widest uppercase">ArkaArya Quantum</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] leading-[1.1]">
                Intelligent <br />
                <span className="text-[#3b82f6]">Digital Evolution.</span>
              </h1>
              <p className="text-[#5E6672] text-lg leading-relaxed max-w-lg">
                Accelerating enterprise digital transformation through custom technology solutions, AI automation, and robust enterprise system engineering.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <button 
                  onClick={() => router.push("/#contact")}
                  className="btn-pill bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                >
                  <span className="font-bold">Explore Tech Capabilities</span>
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
              <div className="absolute inset-0 bg-[#3b82f6] rounded-full blur-[120px] opacity-15" />
              <div className="relative w-full h-full bg-white rounded-[3rem] border border-[#E3E8E4] shadow-2xl flex items-center justify-center overflow-hidden">
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Cpu size={360} strokeWidth={0.5} className="text-[#3b82f6]/10" />
                </motion.div>

                <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <Code2 size={32} className="text-[#3b82f6]" />
                    <span className="text-sm font-bold text-[#00264A]">Custom Software</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center mt-12">
                    <BrainCircuit size={32} className="text-[#00264A]" />
                    <span className="text-sm font-bold text-[#00264A]">AI & Automation</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center -mt-12">
                    <Network size={32} className="text-[#00264A]" />
                    <span className="text-sm font-bold text-[#00264A]">Cloud Infrastructure</span>
                  </div>
                  <div className="bg-[#F8FAF7] p-6 rounded-2xl border border-[#E3E8E4] shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <Database size={32} className="text-[#3b82f6]" />
                    <span className="text-sm font-bold text-[#00264A]">Data Engineering</span>
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
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">Future-Ready Architectures</h2>
              <p className="text-[#94a3b8] text-lg">
                We design and deploy scalable, secure, and intelligent software ecosystems that drive operational efficiency and create new avenues for growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Digital Transformation", desc: "Modernizing legacy systems and migrating workflows to secure, scalable cloud environments to enhance business agility." },
                { title: "Automation & AI", desc: "Implementing intelligent robotic process automation (RPA) and machine learning models to streamline redundant operational tasks." },
                { title: "Enterprise Systems", desc: "Developing robust ERP integrations, secure data pipelines, and custom enterprise software tailored to specific industry requirements." }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-[#3b82f6]/20 text-[#3b82f6] rounded-full flex items-center justify-center mb-6">
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
