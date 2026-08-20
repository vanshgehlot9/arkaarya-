"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Loader2, ArrowRight, MapPin, Building2, TrendingUp, ShieldCheck, Factory, Cpu, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase-browser";

// --- CountUp Component ---
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    // Check if end is actually a number-like string (e.g. "12", "500", but not "100%")
    const numericMatch = String(end).match(/[\d,\.]+/);
    if (!numericMatch) {
      setCount(end as any);
      return;
    }
    
    const targetValue = parseFloat(numericMatch[0].replace(/,/g, ''));
    if (isNaN(targetValue)) {
      setCount(end as any);
      return;
    }

    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentVal = targetValue * easeOutQuart;
      
      // Keep decimals if target had decimals
      if (String(targetValue).includes('.')) {
        setCount(parseFloat(currentVal.toFixed(1)) as any);
      } else {
        setCount(Math.floor(currentVal) as any);
      }
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  // Try to preserve original formatting (like % or +)
  const originalString = String(end);
  const numericPart = originalString.match(/[\d,\.]+/)?.[0] || "";
  if (numericPart && count !== 0) {
    return <span ref={ref}>{originalString.replace(numericPart, String(count))}</span>;
  }

  return <span ref={ref}>{count || end}</span>;
};


export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [study, setStudy] = useState<any>(null);
  const [relatedStudies, setRelatedStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      const supabase = createClient();
      
      // Fetch main case study
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", params.id)
        .single();
      
      if (error || !data) {
        setLoading(false);
        return;
      }

      // Enforce publishing logic for public (can be bypassed by admin session in a real app, but for now strict)
      if (!data.is_published) {
        router.push("/#impact");
        return;
      }

      setStudy(data);

      // Fetch related case studies
      const { data: relatedData } = await supabase
        .from("case_studies")
        .select("id, title, category, cover_image, description")
        .eq("is_published", true)
        .neq("id", data.id)
        .limit(3);

      if (relatedData) {
        // Try to sort by matching industry/category, but basic implementation just shows 3
        setRelatedStudies(relatedData);
      }

      setLoading(false);
    };

    if (params.id) {
      fetchStudy();
    }
  }, [params.id, router]);

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
        <Navbar onOpenCalculator={() => router.push("/#impact")} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#00264A] mb-4">Case Study not found</h2>
            <button 
              onClick={() => router.push("/#impact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#629A13] text-white hover:bg-[#75B518] transition-colors"
            >
              <ArrowLeft size={16} />
              Return to Impact
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasMetrics = study.metrics && Array.isArray(study.metrics) && study.metrics.length > 0;
  const gridColsClass = study.metrics?.length === 1 ? 'md:grid-cols-1' : study.metrics?.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar onOpenCalculator={() => router.push("/#impact")} />

      <main className="flex-grow pt-32 pb-0">
        
        {/* 1. BREADCRUMBS */}
        <div className="px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest text-[#5E6672] uppercase">
            <button onClick={() => router.push("/")} className="hover:text-[#00264A] transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => router.push("/#impact")} className="hover:text-[#00264A] transition-colors">Case Studies</button>
            <span>/</span>
            <span className="text-[#00264A] truncate max-w-[200px] sm:max-w-none">{study.title}</span>
          </div>
        </div>

        {/* 2. SPLIT HERO */}
        <section className="px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-16">
          <div className="bg-[#00264A] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold tracking-widest uppercase mb-8">
                  {study.category}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-[1.1] mb-6">
                  {study.title}
                </h1>
                
                {study.description && (
                  <p className="text-[#C8D8E4] text-lg leading-relaxed mb-10 max-w-lg">
                    {study.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-white/20 text-sm">
                  {study.client_industry && (
                    <div className="flex items-center gap-2 text-[#C8D8E4]">
                      <Building2 size={16} className="text-[#629A13]" />
                      <span className="font-bold text-white">{study.client_industry}</span>
                    </div>
                  )}
                  {study.location && (
                    <div className="flex items-center gap-2 text-[#C8D8E4]">
                      <MapPin size={16} className="text-[#3b82f6]" />
                      <span className="font-bold text-white">{study.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full relative overflow-hidden bg-[#001A33]">
              {study.cover_image ? (
                <img 
                  src={study.cover_image} 
                  alt={study.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/enterprise_ewaste_facility.jpg'; // fallback
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#00264A] to-[#629A13]/20 flex items-center justify-center">
                  <TrendingUp size={64} className="text-white/20" />
                </div>
              )}
              {/* Subtle gradient to blend split on desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00264A] via-transparent to-transparent hidden lg:block w-32" />
            </div>
          </div>
        </section>

        {/* 3. KEY METRICS STRIP */}
        {hasMetrics && (
          <section className="px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-20">
            <div className={`grid grid-cols-1 ${gridColsClass} gap-4 bg-white border border-[#E3E8E4] rounded-2xl p-4 sm:p-8 shadow-sm divide-y md:divide-y-0 md:divide-x divide-[#E3E8E4]`}>
              {study.metrics.map((metric: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-6 md:py-0 px-4"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-[#629A13] mb-2 font-mono">
                    <CountUp end={metric.value} />
                  </div>
                  <div className="text-xs font-bold text-[#5E6672] uppercase tracking-widest">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 4. MAIN EDITORIAL CONTENT */}
        <section className="px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-24">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* Timeline Sidebar (Sticky) */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32">
                <div className="text-[10px] font-bold text-[#629A13] uppercase tracking-widest mb-6">PROJECT PHASES</div>
                <div className="relative border-l-2 border-[#E3E8E4] ml-3 space-y-8 py-2">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-[#00264A] origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                  />
                  
                  {['Challenge', 'Assessment', 'Solution', 'Execution', 'Results'].map((phase, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-white border-2 border-[#00264A] rounded-full -left-[7px] top-1.5" />
                      <span className="text-sm font-bold text-[#5E6672] uppercase tracking-wider">{phase}</span>
                    </div>
                  ))}
                </div>

                {study.client_industry && (
                  <div className="mt-16 bg-[#F8FAF7] border border-[#E3E8E4] p-6 rounded-2xl">
                    <div className="text-[10px] font-bold text-[#629A13] uppercase tracking-widest mb-2">INDUSTRY</div>
                    <div className="font-bold text-[#00264A]">{study.client_industry}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Blocks */}
            <div className="flex-1 space-y-24 max-w-4xl">
              
              {/* The Challenge */}
              {study.challenge && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-serif font-bold text-[#629A13]">01</span>
                    <div className="h-px bg-[#E3E8E4] flex-1" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00264A] mb-8">The Challenge</h2>
                  <div className="prose prose-lg text-[#5E6672] prose-p:leading-relaxed max-w-none whitespace-pre-wrap">
                    {study.challenge}
                  </div>
                </motion.div>
              )}

              {/* The Solution */}
              {study.solution && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-[#00264A] text-white p-8 sm:p-12 rounded-[2rem] shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#629A13]/20 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-3xl font-serif font-bold text-[#629A13]">02</span>
                      <div className="h-px bg-white/20 flex-1" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8">The Solution</h2>
                    <div className="prose prose-lg prose-invert text-[#C8D8E4] prose-p:leading-relaxed max-w-none whitespace-pre-wrap">
                      {study.solution}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* The Results */}
              {study.results && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-serif font-bold text-[#629A13]">03</span>
                    <div className="h-px bg-[#E3E8E4] flex-1" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00264A] mb-8">Measured Impact</h2>
                  <div className="prose prose-lg text-[#5E6672] prose-p:leading-relaxed max-w-none whitespace-pre-wrap mb-12">
                    {study.results}
                  </div>
                  
                  {/* Visual callback to metrics */}
                  {hasMetrics && (
                    <div className="flex flex-wrap gap-4 pt-8 border-t border-[#E3E8E4]">
                      {study.metrics.map((metric: any, i: number) => (
                        <div key={i} className="bg-white border border-[#E3E8E4] px-6 py-4 rounded-xl flex items-center gap-4 shadow-sm">
                          <CheckCircle2 size={20} className="text-[#629A13]" />
                          <div>
                            <span className="font-bold text-[#00264A] mr-2">{metric.value}</span>
                            <span className="text-xs font-bold text-[#5E6672] uppercase tracking-wider">{metric.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
          </div>
        </section>

        {/* 5. RELATED CASE STUDIES */}
        {relatedStudies.length > 0 && (
          <section className="bg-white py-24 border-t border-[#E3E8E4]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A]">More from ArkaArya</h2>
                <button onClick={() => router.push('/#impact')} className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#629A13] hover:text-[#528210] transition-colors group">
                  View All Impact <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStudies.map((relStudy) => (
                  <div 
                    key={relStudy.id} 
                    onClick={() => router.push(`/case-studies/${relStudy.id}`)}
                    className="group cursor-pointer bg-[#F8FAF7] border border-[#E3E8E4] rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden bg-[#00264A] relative">
                      <img 
                        src={relStudy.cover_image || "/enterprise_ewaste_facility.jpg"} 
                        alt={relStudy.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00264A]/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase">
                        {relStudy.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#00264A] mb-3 line-clamp-2">{relStudy.title}</h3>
                      <p className="text-sm text-[#5E6672] line-clamp-2 mb-6">
                        {relStudy.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#3b82f6] group-hover:text-[#2563eb] transition-colors">
                        Read Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. FINAL CTA */}
        <section className="bg-[#00264A] text-white py-24 px-6 sm:px-10 lg:px-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#629A13]/10 pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8">
              Have a Similar Challenge?
            </h2>
            <p className="text-[#C8D8E4] text-lg mb-10">
              Let's build a responsible, high-performance solution for your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#629A13] text-white flex items-center justify-center font-bold hover:bg-[#75B518] transition-colors shadow-sm btn-eco-glow"
              >
                Talk to ArkaArya
              </Link>
              <Link 
                href="/pickup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-white font-bold hover:bg-white/20 transition-colors shadow-sm"
              >
                Schedule a Pickup
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
