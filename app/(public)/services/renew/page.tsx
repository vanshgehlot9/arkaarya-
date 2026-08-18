"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Sun, Battery, Activity, Building2,
  Zap, BarChart, Leaf, CheckCircle2, ShieldCheck, Factory
} from "lucide-react";
import * as LucideIcons from "lucide-react";
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
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

// --- Content Data ---
const CAPABILITIES = [
  { icon: Sun, label: "SOLAR MICROGRIDS" },
  { icon: Battery, label: "ENERGY STORAGE" },
  { icon: Activity, label: "HVAC EFFICIENCY" },
  { icon: Building2, label: "GREEN ARCHITECTURE" },
  { icon: BarChart, label: "ENERGY CONSULTING" }
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Solar Energy",
    desc: "Commercial and industrial solar systems designed around actual energy requirements.",
    icon: Sun,
    image: "/premium_solar_facility.jpg"
  },
  {
    num: "02",
    title: "Energy Storage",
    desc: "Battery and storage solutions for reliability, resilience and intelligent energy management.",
    icon: Battery,
    image: "/industrial_energy_storage.jpg"
  },
  {
    num: "03",
    title: "Energy Efficiency",
    desc: "Optimisation of HVAC, electrical systems and facility energy consumption.",
    icon: Activity,
    image: "/premium_solar_facility.jpg" // Reusing due to placeholder status
  },
  {
    num: "04",
    title: "Green Architecture",
    desc: "Energy-conscious infrastructure and sustainable building solutions.",
    icon: Building2,
    image: "/industrial_energy_storage.jpg" // Reusing due to placeholder status
  }
];

const FLOW_STEPS = [
  { id: 1, title: "SOLAR GENERATION", desc: "Capturing peak solar irradiance through highly efficient PV infrastructure designed for maximum yield." },
  { id: 2, title: "ENERGY STORAGE", desc: "Advanced BESS (Battery Energy Storage Systems) to capture excess energy for peak shaving and outage resilience." },
  { id: 3, title: "SMART MANAGEMENT", desc: "Intelligent IoT routing systems that dynamically direct power where it's needed most in real-time." },
  { id: 4, title: "EFFICIENT OPERATIONS", desc: "Optimizing HVAC and heavy electrical loads to drastically reduce overall consumption." },
  { id: 5, title: "LOWER CARBON IMPACT", desc: "Achieving measurable reduction in Scope 2 emissions and progressing toward net-zero targets." }
];

const WHY_RENEW = [
  {
    title: "Engineering-Led",
    desc: "Solutions designed around actual infrastructure requirements.",
    icon: Factory
  },
  {
    title: "Technology-Enabled",
    desc: "Monitoring, optimisation and intelligent energy management.",
    icon: Zap
  },
  {
    title: "Business-Focused",
    desc: "Designed to improve efficiency and long-term operating economics.",
    icon: BarChart
  },
  {
    title: "Sustainability-Driven",
    desc: "Helping organisations move toward measurable environmental goals.",
    icon: Leaf
  }
];

export default function ArkaAryaRenew() {
  const router = useRouter();
  const [activeFlowStep, setActiveFlowStep] = useState(1);
  const [heroImage, setHeroImage] = useState("/industrial_energy_storage.jpg");
  const [dynamicSolutions, setDynamicSolutions] = useState<any[]>(SOLUTIONS);

  useEffect(() => {
    const fetchServiceData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("services")
        .select(`
          image_url,
          service_solutions (
            id, title, description, icon_name, order_index
          )
        `)
        .eq("identifier", "renew")
        .single();
        
      if (!error && data) {
        if (data.image_url) {
          setHeroImage(data.image_url);
        }
        if (data.service_solutions && data.service_solutions.length > 0) {
          const sorted = [...data.service_solutions].sort((a, b) => a.order_index - b.order_index);
          setDynamicSolutions(sorted);
        }
      }
    };
    fetchServiceData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212] overflow-x-hidden">
      <Navbar onOpenPickup={() => router.push("/pickup")} onOpenCalculator={() => router.push("/#impact")} />

      <main className="flex-grow pt-32 pb-0">
        
        {/* 1. HERO SECTION */}
        <section className="relative px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-16">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
            style={{ 
              backgroundImage: `linear-gradient(#00264A 1px, transparent 1px), linear-gradient(90deg, #00264A 1px, transparent 1px)`, 
              backgroundSize: '40px 40px' 
            }} 
          />

          <button 
            onClick={() => router.push("/")}
            className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#5E6672] hover:text-[#00264A] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Homepage
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E8E4] shadow-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-[#D9A400] animate-pulse" />
                <span className="text-[#00264A] text-[11px] font-bold tracking-widest uppercase">ArkaArya Renew</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#00264A] leading-[1.1] tracking-tight">
                Powering the <br />
                <span className="text-[#629A13]">Clean Transition.</span>
              </h1>
              <p className="text-[#5E6672] text-lg leading-relaxed max-w-lg font-medium">
                Delivering sustainable energy infrastructure, advanced solar solutions, and end-to-end energy consulting for enterprises looking to achieve net-zero goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                  onClick={() => router.push("/contact")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00264A] text-white font-bold hover:bg-[#001A33] transition-all shadow-sm btn-blue-glow group/btn"
                >
                  <span>Talk to an Energy Expert</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-[#E3E8E4] text-[#00264A] font-bold hover:border-[#629A13] hover:text-[#629A13] transition-colors shadow-sm"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight size={16} className="rotate-90" />
                </button>
              </div>
            </motion.div>

            {/* Right Visual Composition */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full aspect-[4/3] lg:aspect-square max-w-[650px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl"
            >
              {/* Base Photograph */}
              <div className="absolute inset-0 bg-[#00264A]">
                <img 
                  src={heroImage} 
                  alt="Industrial Energy Storage Facility" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Interactive Information Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md bg-[#00264A]/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden group">
                  
                  {/* Subtle Grid in the overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDQwaDQwTTAgMjBoNDBNMjAgMHY0ME00MCAwdjQwIi8+PC9nPjwvc3ZnPg==')] opacity-50" />

                  <div className="relative z-10">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#D9A400] mb-6 flex items-center gap-2">
                      <Zap size={12} />
                      Clean Energy System
                    </h3>
                    
                    <div className="flex flex-col gap-5 font-mono text-xs sm:text-sm">
                      <div className="flex items-center justify-between group-hover:text-[#D9A400] transition-colors">
                        <div className="flex items-center gap-2"><Sun size={16} /> Solar</div>
                        <div className="h-[1px] flex-1 bg-white/20 mx-4 relative overflow-hidden">
                          <motion.div 
                            className="absolute inset-y-0 left-0 w-full bg-[#D9A400]" 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />
                        </div>
                        <div className="flex items-center gap-2"><Battery size={16} /> Storage</div>
                      </div>

                      <div className="flex justify-between px-6 text-white/20">
                        <span>↓</span>
                        <span>↓</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><Building2 size={16} /> Building</div>
                        <div className="h-[1px] flex-1 bg-white/20 mx-4 relative overflow-hidden">
                          <motion.div 
                            className="absolute inset-y-0 left-0 w-full bg-[#629A13]" 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
                          />
                        </div>
                        <div className="flex items-center gap-2"><Activity size={16} /> Mgt</div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] tracking-widest text-white/60">SYSTEM STATUS</span>
                      <span className="text-[11px] font-bold tracking-widest text-[#629A13] flex items-center gap-1.5 bg-[#629A13]/10 px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#629A13] animate-pulse" />
                        OPTIMIZED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. ENERGY CAPABILITY STRIP */}
        <section className="border-y border-[#E3E8E4] bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="flex flex-wrap lg:flex-nowrap justify-between">
              {CAPABILITIES.map((cap, i) => (
                <div 
                  key={i} 
                  className="flex-1 min-w-[200px] py-8 px-4 flex flex-col items-center justify-center text-center group cursor-pointer border-r border-[#E3E8E4] last:border-0 hover:bg-[#F8FAF7] transition-colors relative"
                >
                  <cap.icon size={24} className="text-[#5E6672] mb-3 group-hover:text-[#629A13] transition-colors" />
                  <span className="text-xs font-bold tracking-widest text-[#5E6672] group-hover:text-[#00264A] transition-colors">
                    {cap.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#629A13] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. OUR SOLUTIONS */}
        <section id="solutions" className="py-24 px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-bold text-[#629A13] uppercase tracking-widest mb-4">OUR SOLUTIONS</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] leading-tight mb-6">
              Energy Systems Built for <br />Real-World Performance.
            </h2>
            <p className="text-[#5E6672] text-lg leading-relaxed">
              From generation to optimisation, ArkaArya Renew helps organisations reduce energy costs, improve efficiency and transition toward cleaner infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicSolutions.map((sol, i) => {
              const Icon = typeof sol.icon === 'string' 
                ? ((LucideIcons as any)[sol.icon] || LucideIcons.Box)
                : (sol.icon_name ? ((LucideIcons as any)[sol.icon_name] || LucideIcons.Box) : sol.icon);
                
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative bg-white border border-[#E3E8E4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative bg-[#00264A] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCA0MGg0ME0wIDIwaDQwTTIwIDB2NDBNNDAgMHY0MCIvPjwvZz48L3N2Zz4=')]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00264A] to-transparent z-10" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative z-20 w-20 h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center text-[#629A13] shadow-2xl"
                    >
                      <Icon size={40} strokeWidth={1.5} />
                    </motion.div>

                    <div className="absolute bottom-4 left-6 flex items-center gap-3 z-20">
                      <span className="text-white font-mono text-sm font-bold opacity-70">0{i + 1}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#00264A] mb-3">{sol.title}</h3>
                    <p className="text-sm text-[#5E6672] leading-relaxed flex-1">
                      {sol.description || sol.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 7. INTERACTIVE ENERGY FLOW */}
        <section className="py-24 bg-white border-y border-[#E3E8E4] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="mb-16">
              <div className="text-[11px] font-bold text-[#629A13] uppercase tracking-widest mb-4">HOW CLEAN ENERGY WORKS</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00264A]">Integrated Energy Intelligence</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Stepper */}
              <div className="w-full lg:w-1/2 relative">
                {/* Connecting Line background */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#E3E8E4] -z-10" />
                
                {/* Animated progress line */}
                <motion.div 
                  className="absolute left-[15px] top-4 w-0.5 bg-[#629A13] -z-10 origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                <div className="space-y-8">
                  {FLOW_STEPS.map((step, i) => (
                    <div 
                      key={step.id} 
                      className="flex items-start gap-6 cursor-pointer group"
                      onMouseEnter={() => setActiveFlowStep(step.id)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300 ${activeFlowStep === step.id ? 'border-[#629A13] bg-[#F1F7E8] text-[#629A13]' : 'border-[#E3E8E4] bg-white text-[#5E6672] group-hover:border-[#00264A]'}`}>
                        <span className="text-xs font-bold">{step.id}</span>
                      </div>
                      <div className="pt-1">
                        <h4 className={`text-sm font-bold tracking-widest transition-colors ${activeFlowStep === step.id ? 'text-[#00264A]' : 'text-[#5E6672]'}`}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Content Panel */}
              <div className="w-full lg:w-1/2">
                <div className="bg-[#F8FAF7] border border-[#E3E8E4] rounded-2xl p-8 sm:p-12 min-h-[250px] flex items-center relative overflow-hidden shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFlowStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <div className="text-[#D9A400] font-mono text-sm font-bold mb-4 opacity-80">STAGE 0{activeFlowStep}</div>
                      <h3 className="text-2xl font-bold text-[#00264A] mb-4">{FLOW_STEPS[activeFlowStep - 1].title}</h3>
                      <p className="text-[#5E6672] text-lg leading-relaxed">
                        {FLOW_STEPS[activeFlowStep - 1].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Decorative background element */}
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-[#E3E8E4] rounded-full opacity-50" />
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 border border-[#E3E8E4] rounded-full opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. MEASURABLE ENERGY IMPACT */}
        <section className="bg-[#00264A] text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCA0MGg0ME0wIDIwaDQwTTIwIDB2NDBNNDAgMHY0MCIvPjwvZz48L3N2Zz4=')] pointer-events-none" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Measurable Energy Impact</h2>
              <p className="text-[#C8D8E4] max-w-2xl mx-auto">Real-world metrics tracked and verified across our enterprise renewable installations.</p>
            </div>

            <div className="border-y border-white/20 py-12">
              {/* TODO: Connect these values to Admin CMS later */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10">
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-[#629A13] mb-2 flex items-center justify-center">
                    <CountUp end={45} /> <span className="text-2xl ml-1">MW</span>
                  </div>
                  <div className="text-xs font-bold text-[#C8D8E4] uppercase tracking-widest">Solar Capacity Supported</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-[#629A13] mb-2 flex items-center justify-center">
                    <CountUp end={120} /> <span className="text-2xl ml-1">GWh</span>
                  </div>
                  <div className="text-xs font-bold text-[#C8D8E4] uppercase tracking-widest">Energy Saved</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-[#D9A400] mb-2 flex items-center justify-center">
                    <CountUp end={85} /> <span className="text-2xl ml-1">k</span>
                  </div>
                  <div className="text-xs font-bold text-[#C8D8E4] uppercase tracking-widest">CO₂ Avoided (Tons)</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-bold text-[#629A13] mb-2 flex items-center justify-center">
                    <CountUp end={132} /> <span className="text-2xl ml-1">+</span>
                  </div>
                  <div className="text-xs font-bold text-[#C8D8E4] uppercase tracking-widest">Enterprise Projects</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. REAL-WORLD PROJECT / CASE STUDY */}
        <section className="py-24 px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto">
          <div className="mb-12">
            <div className="text-[11px] font-bold text-[#629A13] uppercase tracking-widest mb-4">FROM PLAN TO PERFORMANCE</div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00264A]">Featured Implementation</h2>
          </div>

          <div className="bg-white rounded-[2rem] border border-[#E3E8E4] shadow-sm overflow-hidden flex flex-col lg:flex-row group">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative overflow-hidden bg-[#00264A]">
              <img 
                src="/industrial_energy_storage.jpg" 
                alt="Featured Project" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00264A]/20" />
            </div>

            {/* Content Side */}
            {/* TODO: Connect to Case Studies CMS */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAF7] border border-[#E3E8E4] text-[#00264A] text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                Manufacturing Sector
              </div>
              
              <h3 className="text-2xl font-bold text-[#00264A] mb-6">Global Tech Manufacturing Hub</h3>
              
              <div className="space-y-6 text-sm text-[#5E6672]">
                <div>
                  <h4 className="font-bold text-[#00264A] uppercase tracking-wider text-[11px] mb-1">Challenge</h4>
                  <p>High grid dependency causing significant operational costs and failing to meet the global corporation's aggressive 2030 net-zero mandates.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#00264A] uppercase tracking-wider text-[11px] mb-1">Solution</h4>
                  <p>Deployed a 2.5MW rooftop solar array integrated with a 1MWh BESS and intelligent energy routing system for peak shaving.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E3E8E4] mb-8">
                <div>
                  <div className="text-2xl font-bold text-[#629A13] mb-1">42%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#5E6672]">Grid Independence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#629A13] mb-1">3.2 Yrs</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#5E6672]">Projected ROI</div>
                </div>
              </div>

              <button onClick={() => router.push('/#impact')} className="flex items-center gap-2 text-sm font-bold text-[#00264A] hover:text-[#629A13] transition-colors group/link w-fit">
                View Full Case Study <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* 10. WHY ARKAARYA RENEW */}
        <section className="py-24 bg-[#F8FAF7] border-t border-[#E3E8E4]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00264A] text-center mb-16">
              Energy Strategy With Execution Behind It.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {WHY_RENEW.map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E3E8E4] shadow-sm flex items-center justify-center text-[#00264A]">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#00264A]">{item.title}</h3>
                  <p className="text-sm text-[#5E6672] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="bg-[#00264A] text-white py-32 px-6 sm:px-10 lg:px-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#629A13]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D9A400]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-[11px] font-bold text-[#D9A400] uppercase tracking-widest mb-6">READY TO BUILD A CLEANER ENERGY SYSTEM?</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-10 leading-tight">
              Let's design an energy strategy around your organisation.
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => router.push("/contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#629A13] text-white font-bold hover:bg-[#75B518] transition-all shadow-sm btn-eco-glow group"
              >
                <span>Talk to an Energy Expert</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button 
                onClick={() => router.push("/#impact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-colors shadow-sm group"
              >
                <span>Calculate Your Impact</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenPickup={() => router.push("/pickup")} />
    </div>
  );
}
