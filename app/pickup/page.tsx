"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Lock, CheckCircle2, ChevronRight, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { submitPickupRequest } from "@/app/actions/submitPickup";

// We wrap the form inside a Suspense boundary because it uses useSearchParams()
const PickupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialNotes = searchParams.get("notes") || "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    estimatedWeight: "100 - 500 kg",
    preferredDate: "",
    notes: initialNotes,
  });

  const [locations, setLocations] = useState<{ state: string; districts: string[] }[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Fetch all Indian states and districts from a public JSON
    fetch("https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.states);
        setIsLoadingLocations(false);
      })
      .catch((err) => {
        console.error("Failed to load locations", err);
        setIsLoadingLocations(false);
      });
  }, []);

  const availableCities = locations.find((l) => l.state === formData.state)?.districts || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const result = await submitPickupRequest(form);
      if (result.success) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(result.error || "An error occurred");
      }
    } catch (err) {
      setSubmitError("Failed to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2rem] border border-[#E3E8E4] shadow-2xl"
      >
        <div className="w-24 h-24 bg-[#EBF5DC] text-[#629A13] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#00264A] mb-4">
          Pickup Request Confirmed
        </h2>
        <p className="text-[#5E6672] mb-8 max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{formData.contactPerson}</strong>. Your request has been securely logged. Our logistics compliance manager will contact you within 2 business hours.
        </p>
        
        <div className="bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl px-6 py-4 mb-8 text-sm text-[#00264A]">
          <strong>Tracking Reference:</strong> ARKA-{Math.floor(100000 + Math.random() * 900000)}
        </div>

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00264A] text-white font-semibold hover:bg-[#001A33] transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Return to Homepage</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 sm:p-10 rounded-[2rem] border border-[#E3E8E4] shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#629A13]/05 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF5DC] text-[#00264A] text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#629A13]" />
          Step 1 of 1
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A]">
          Organization Details
        </h2>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Company / Organization *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Acme Technologies Ltd" 
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Contact Person *</label>
            <input 
              type="text" 
              required
              placeholder="Full name" 
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Work Email *</label>
            <input 
              type="email" 
              required
              placeholder="name@company.com" 
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Phone / WhatsApp *</label>
            <input 
              type="tel" 
              required
              placeholder="+91 98765 43210" 
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">State / Region *</label>
            <select 
              required
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all appearance-none cursor-pointer disabled:opacity-50"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value, city: ""})}
              disabled={isLoadingLocations}
            >
              <option value="" disabled>{isLoadingLocations ? "Loading States..." : "Select State"}</option>
              {locations.map((loc) => (
                <option key={loc.state} value={loc.state}>{loc.state}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">City / District *</label>
            <select 
              required
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all appearance-none cursor-pointer disabled:opacity-50"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              disabled={!formData.state || availableCities.length === 0}
            >
              <option value="" disabled>Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Estimated Batch Weight</label>
            <select 
              className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all appearance-none cursor-pointer"
              value={formData.estimatedWeight}
              onChange={(e) => setFormData({...formData, estimatedWeight: e.target.value})}
            >
              <option value="< 100 kg">&lt; 100 kg</option>
              <option value="100 - 500 kg">100 - 500 kg</option>
              <option value="500 kg - 2 Tonnes">500 kg - 2 Tonnes</option>
              <option value="> 2 Tonnes Enterprise Fleet">&gt; 2 Tonnes Enterprise Fleet</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#00264A] uppercase tracking-wider">Batch Specifics / Notes</label>
          <textarea 
            rows={3} 
            className="w-full px-5 py-3.5 bg-[#F8FAF7] border border-[#E3E8E4] rounded-xl text-[#00264A] focus:outline-none focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] transition-all resize-none"
            placeholder="Mention device models, data wiping requirements, or calculator export details..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>
      </div>

      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
          {submitError}
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-[#E3E8E4]">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#629A13] text-white font-bold text-sm transition-all duration-300 hover:bg-[#528210] hover:shadow-[0_10px_25px_rgba(98,154,19,0.3)] hover:-translate-y-0.5 group disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Processing Request...</span>
            </>
          ) : (
            <>
              <span>Confirm & Request Fleet Dispatch</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-[#5E6672] mt-4">
          By submitting, you agree to ArkaArya's secure data handling and processing terms.
        </p>
      </div>
    </motion.form>
  );
};

export default function PickupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar 
        onOpenPickup={() => {}} 
        onOpenCalculator={() => router.push("/#impact")} 
      />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          
          <button 
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E6672] hover:text-[#00264A] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Homepage
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex flex-col gap-10"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#00264A] leading-tight mb-6">
                  Schedule Secure <br/>
                  <span className="text-[#629A13]">Asset Collection.</span>
                </h1>
                <p className="text-[#5E6672] text-lg leading-relaxed">
                  Initiate a certified corporate e-waste pickup. Our GPS-monitored fleet guarantees secure transit directly to our R2v3 authorized dismantling facilities.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E3E8E4] flex items-center justify-center shrink-0 shadow-sm text-[#00264A]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00264A] mb-1">CPCB Authorized Logistics</h3>
                    <p className="text-sm text-[#5E6672] leading-relaxed">
                      Legal Form-6 manifests are issued at the point of collection, ensuring complete regulatory compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E3E8E4] flex items-center justify-center shrink-0 shadow-sm text-[#00264A]">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00264A] mb-1">Data Chain of Custody</h3>
                    <p className="text-sm text-[#5E6672] leading-relaxed">
                      From pickup to destruction, all data-bearing devices are tracked via secure serial logging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E3E8E4] flex items-center justify-center shrink-0 shadow-sm text-[#00264A]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00264A] mb-1">EPR Credit Generation</h3>
                    <p className="text-sm text-[#5E6672] leading-relaxed">
                      Automatically translate your recycled batches into verified Extended Producer Responsibility credits.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#EBF5DC] border border-[#629A13]/20 rounded-2xl p-6 mt-4">
                <p className="text-sm font-semibold text-[#00264A] flex items-start gap-2">
                  <span className="text-[#629A13]">★</span>
                  Over 120+ enterprises trust ArkaArya for risk-free IT asset disposal.
                </p>
              </div>
            </motion.div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="w-full h-[600px] bg-white rounded-[2rem] border border-[#E3E8E4] animate-pulse" />}>
                <PickupForm />
              </Suspense>
            </div>

          </div>
        </div>
      </main>

      <Footer onOpenPickup={() => {}} />
    </div>
  );
}
