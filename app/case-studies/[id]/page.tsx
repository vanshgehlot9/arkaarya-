"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase-browser";

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", params.id)
        .single();
      
      if (data) {
        setStudy(data);
      }
      setLoading(false);
    };
    if (params.id) {
      fetchStudy();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7]">
        <Loader2 className="w-10 h-10 animate-spin text-[#629A13]" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
        <Navbar onOpenPickup={() => router.push("/pickup")} onOpenCalculator={() => router.push("/#impact")} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#00264A] mb-4">Case Study not found</h2>
            <button 
              onClick={() => router.push("/#impact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#629A13] text-white hover:bg-[#75B518] transition-colors"
            >
              <ArrowLeft size={16} />
              Return Home
            </button>
          </div>
        </div>
        <Footer onOpenPickup={() => router.push("/pickup")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar onOpenPickup={() => router.push("/pickup")} onOpenCalculator={() => router.push("/#impact")} />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-16">
          <button 
            onClick={() => router.push("/#impact")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E6672] hover:text-[#00264A] transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </button>

          <div className="bg-[#00264A] rounded-[2rem] overflow-hidden relative p-8 sm:p-16 text-white min-h-[400px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img src={study.cover_image} alt={study.title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00264A] to-[#00264A]/60" />
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
                {study.category}
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6"
              >
                {study.title}
              </motion.h1>
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-[#00264A] mb-6">Overview</h2>
              <div className="text-[#5E6672] text-lg leading-relaxed whitespace-pre-wrap">
                {study.description}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 border border-[#E3E8E4] shadow-sm sticky top-32">
                <h3 className="text-xl font-bold text-[#00264A] mb-6 border-b border-[#E3E8E4] pb-4">Key Metrics</h3>
                <div className="flex flex-col gap-6">
                  {study.metrics?.map((metric: any, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-[#629A13] mb-1">{metric.value}</div>
                      <div className="text-xs font-bold text-[#5E6672] uppercase tracking-wider">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenPickup={() => router.push("/pickup")} />
    </div>
  );
}
