"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Cpu, Users } from "lucide-react";

const benefits = [
  {
    title: "Purpose-Driven Work",
    description: "Work on projects that contribute to environmental and social impact.",
    icon: <Target size={24} />,
  },
  {
    title: "Continuous Growth",
    description: "Learn, experiment, and develop your skills through meaningful projects.",
    icon: <TrendingUp size={24} />,
  },
  {
    title: "Technology & Innovation",
    description: "Work across modern technology, renewable energy, e-waste management, and digital solutions.",
    icon: <Cpu size={24} />,
  },
  {
    title: "People & Collaboration",
    description: "Work with people who value ownership, curiosity, and collaboration.",
    icon: <Users size={24} />,
  },
];

export const WhyArkaArya = () => {
  return (
    <section id="why-arkaarya" className="py-24 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#629A13] font-bold tracking-widest text-sm uppercase mb-4">
              Why ArkaArya
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00264A]">
              More Than a Job. <br /> A Chance to Build Something Meaningful.
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#4A5568]"
          >
            We bring together people who care about technology, sustainability, innovation, and creating opportunities for a better future.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8FAF7] border border-[#E3E8E4] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 hover:border-[#629A13]/30 transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#00264A] shadow-sm group-hover:bg-[#629A13] group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#00264A] mt-2">
                {benefit.title}
              </h3>
              <p className="text-[#4A5568] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
