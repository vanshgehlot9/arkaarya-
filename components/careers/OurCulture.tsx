"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const values = [
  "Ownership",
  "Integrity",
  "Learning",
  "Collaboration",
  "Sustainability",
  "Innovation"
];

export const OurCulture = () => {
  return (
    <section className="py-24 bg-[#00264A] text-white overflow-hidden relative">
      {/* Background Subtle Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#629A13]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block text-[#629A13] font-bold tracking-widest text-sm uppercase mb-4">
                Our Culture
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Curious Minds. <br />
                <span className="text-[#629A13]">Responsible Actions.</span>
              </h2>
            </div>
            
            <p className="text-[#E6ECF2] text-lg leading-relaxed max-w-lg">
              We are building a culture where curiosity drives innovation, and responsibility guides our actions. We believe in providing the freedom to experiment, the support to grow, and the shared purpose to make a difference.
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#629A13]" />
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-12">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-[#053766]">
                <img 
                  src="/social_environment.jpg" 
                  alt="Team Environment Activity" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-[#053766]">
                <img 
                  src="/social_events.jpg" 
                  alt="Company Social Event" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
