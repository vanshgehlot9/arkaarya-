"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, UploadCloud } from "lucide-react";

export const GeneralApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
    }, 1000);
  };

  return (
    <section id="general-application" className="py-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="bg-[#00264A] rounded-3xl overflow-hidden relative shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#629A13]/10 blur-[80px] pointer-events-none transform -skew-x-12" />

          <div className="grid md:grid-cols-2">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block text-[#629A13] font-bold tracking-widest text-sm uppercase mb-4">
                Don't See Your Role?
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                We'd Still Like <br /> to Meet You.
              </h2>
              <p className="text-[#E6ECF2] text-lg leading-relaxed mb-8">
                Tell us about yourself and we'll keep your profile in mind for future opportunities across our teams.
              </p>
              
              <div className="flex items-center gap-4 text-[#E6ECF2] mt-auto">
                <div className="w-12 h-12 rounded-full border border-[#053766] bg-[#001A33] flex items-center justify-center">
                  <span className="text-[#629A13] font-bold text-xl">+</span>
                </div>
                <div className="text-sm font-medium">
                  We are always looking for <br /> passionate individuals.
                </div>
              </div>
            </div>

            <div className="bg-[#001A33] p-10 lg:p-14 border-l border-[#053766]">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-[#629A13]/20 rounded-full flex items-center justify-center text-[#629A13]">
                    <Send size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Profile Received</h3>
                  <p className="text-[#E6ECF2]">
                    Thank you for your interest in ArkaArya. Our talent team will review your profile and reach out if there's a match.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#629A13] hover:text-white transition-colors font-medium text-sm pt-4"
                  >
                    Submit another profile
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#E6ECF2]">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#00264A] border border-[#053766] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#629A13] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-[#E6ECF2]">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#00264A] border border-[#053766] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#629A13] transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-[#E6ECF2]">Phone</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#00264A] border border-[#053766] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#629A13] transition-colors"
                        placeholder="+91..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#E6ECF2]">Area of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-[#00264A] border border-[#053766] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#629A13] transition-colors appearance-none"
                    >
                      <option value="">Select an area</option>
                      <option value="Technology">Technology & Software</option>
                      <option value="Sustainability">Sustainability & ESG</option>
                      <option value="Operations">Operations & Logistics</option>
                      <option value="Sales">Sales & Business Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#E6ECF2]">Resume / CV</label>
                    <label className="flex items-center justify-center gap-2 w-full bg-[#00264A] border border-[#053766] border-dashed text-[#E6ECF2] hover:text-white rounded-xl px-4 py-3 cursor-pointer hover:border-[#629A13] transition-colors">
                      <UploadCloud size={18} />
                      <span className="text-sm">Upload PDF</span>
                      <input type="file" accept=".pdf" className="hidden" />
                    </label>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#629A13] text-white font-semibold py-3.5 rounded-xl hover:bg-[#528210] transition-colors shadow-lg shadow-[#629A13]/20"
                    >
                      Send Your Profile
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
