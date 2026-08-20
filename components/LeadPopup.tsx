"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Laptop, Smartphone, Server, Recycle, Loader2, Phone } from "lucide-react";
import { submitLead } from "@/app/actions/submitLead";

export const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", email: "", service: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Check if user has already dismissed or submitted the modal
    const hasSeenModal = localStorage.getItem("arka_lead_modal_dismissed");
    if (hasSeenModal) return;

    let timerId: NodeJS.Timeout;

    // 1. Time-based trigger (10 seconds)
    timerId = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    // 2. Exit Intent trigger (Desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        const dismissed = localStorage.getItem("arka_lead_modal_dismissed");
        if (!dismissed && !isOpen) {
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("arka_lead_modal_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const result = await submitLead(form);
      if (result.success) {
        setIsSubmitted(true);
        localStorage.setItem("arka_lead_modal_dismissed", "true");
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        setSubmitError(result.error || "An error occurred");
      }
    } catch (err) {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#001A33]/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1000px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#F7F9F6] hover:bg-[#E3E8E4] text-[#00264A] rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Side: Premium Illustration Area */}
            <div className="w-full md:w-5/12 bg-[#F7F9F6] border-r border-[#E3E8E4] relative overflow-hidden flex flex-col p-8 sm:p-10 min-h-[250px] md:min-h-0">
              
              <div className="flex-1 flex items-center justify-center relative">
                
                {/* Central Recycling Node */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute text-[#629A13]/20"
                >
                  <Recycle size={180} strokeWidth={1} />
                </motion.div>

                <div className="relative z-10 w-full aspect-square max-w-[280px]">
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-4 w-14 h-14 bg-white border border-[#E3E8E4] rounded-xl shadow-md flex items-center justify-center text-[#00264A]"
                  >
                    <Smartphone size={24} strokeWidth={1.5} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 right-0 w-16 h-16 bg-white border border-[#E3E8E4] rounded-xl shadow-md flex items-center justify-center text-[#00264A]"
                  >
                    <Server size={28} strokeWidth={1.5} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white border-2 border-[#629A13] rounded-2xl shadow-lg flex items-center justify-center text-[#00264A] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#629A13]/5" />
                    <Laptop size={40} strokeWidth={1.5} className="text-[#629A13]" />
                  </motion.div>

                  {/* Animated Path */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path 
                      d="M 50 200 Q 140 250 220 100" 
                      fill="none" 
                      stroke="#629A13" 
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: [0, -40] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>
              </div>

              <div className="relative z-10 text-center mt-6 hidden md:block">
                <p className="text-[#00264A] font-bold text-sm tracking-widest uppercase mb-1">
                  Collect • Recover • Recycle
                </p>
                <div className="w-12 h-1 bg-[#629A13] mx-auto rounded-full" />
              </div>
            </div>

            {/* Right Side: Form Area */}
            <div className="w-full md:w-7/12 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5DC] text-[#00264A] text-[9px] font-bold tracking-widest uppercase mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#629A13]" />
                      <span>Let's Build a Cleaner Future</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A] leading-tight mb-3">
                      Ready to responsibly manage your e-waste?
                    </h2>
                    
                    <p className="text-sm text-[#5E6672] mb-8 leading-relaxed">
                      Tell us what you need and our team will help you with the right collection, recycling, and recovery solution.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-xs font-bold text-[#00264A] uppercase tracking-wide">Full Name</label>
                          <input required type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-2.5 bg-[#F7F9F6] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="company" className="text-xs font-bold text-[#00264A] uppercase tracking-wide">Company</label>
                          <input required type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Organization Ltd." className="w-full px-4 py-2.5 bg-[#F7F9F6] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5 relative">
                          <label htmlFor="phone" className="text-xs font-bold text-[#00264A] uppercase tracking-wide">Phone Number</label>
                          <input required type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 90000 00000" className="w-full px-4 py-2.5 bg-[#F7F9F6] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-xs font-bold text-[#00264A] uppercase tracking-wide">Work Email</label>
                          <input required type="email" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email address (e.g. user@example.com)" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@company.com" className="w-full px-4 py-2.5 bg-[#F7F9F6] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="service" className="text-xs font-bold text-[#00264A] uppercase tracking-wide">What are you looking for?</label>
                        <select required id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-2.5 bg-[#F7F9F6] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all appearance-none cursor-pointer">
                          <option value="" disabled>Select an option...</option>
                          <option value="Pickup">E-Waste Pickup</option>
                          <option value="Corporate">Corporate E-Waste Recycling</option>
                          <option value="ITAD">IT Asset Disposal</option>
                          <option value="Data Destruction">Secure Data Destruction</option>
                          <option value="Bulk">Bulk E-Waste Management</option>
                          <option value="Renewable">Renewable Energy</option>
                          <option value="Quantum">IT / Software Solutions</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {submitError && (
                        <div className="text-red-500 text-xs font-semibold px-2">
                          {submitError}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#629A13] text-white font-bold text-sm transition-all duration-300 hover:bg-[#528210] hover:shadow-[0_10px_25px_rgba(98,154,19,0.3)] hover:-translate-y-0.5 group disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            <span>Request a Callback</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <div className="text-center mt-3">
                        <a href="https://wa.me/919908990874" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6672] hover:text-[#629A13] transition-colors">
                          Prefer WhatsApp? Chat with us <ArrowRight size={12} />
                        </a>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-[#EBF5DC] rounded-full flex items-center justify-center mb-6 text-[#629A13]">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#00264A] mb-4">
                      Thank You.
                    </h2>
                    <p className="text-sm text-[#5E6672] max-w-sm leading-relaxed">
                      We've received your request. Our team will get back to you shortly to help design the perfect solution for your needs.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
