"use client";

import React, { useState } from "react";
import { submitEPRInquiry } from "@/app/actions/submitEPR";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function EPRForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitEPRInquiry(formData);
      
      if (result.success) {
        setStatus("success");
        setMessage("Thank you! Your EPR inquiry has been submitted successfully. Our team will contact you shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#E3E8E4]">
      <h3 className="text-2xl font-bold text-[#00264A] mb-6">Request an EPR Consultation</h3>
      
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl flex items-start gap-3 border border-green-200">
          <CheckCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl flex items-start gap-3 border border-red-200">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="companyName" className="text-sm font-semibold text-[#4A5568]">Company Name *</label>
            <input 
              type="text" 
              id="companyName" 
              name="companyName" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all"
              placeholder="Your Company Ltd."
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contactPerson" className="text-sm font-semibold text-[#4A5568]">Contact Person *</label>
            <input 
              type="text" 
              id="contactPerson" 
              name="contactPerson" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-[#4A5568]">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all"
              placeholder="john@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-[#4A5568]">Phone Number *</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="ewasteCategory" className="text-sm font-semibold text-[#4A5568]">E-waste Category *</label>
            <select 
              id="ewasteCategory" 
              name="ewasteCategory" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all bg-white"
            >
              <option value="">Select Category</option>
              <option value="IT & Telecommunication Equipment">IT & Telecommunication Equipment</option>
              <option value="Consumer Electricals & Electronics">Consumer Electricals & Electronics</option>
              <option value="Large & Small Household Appliances">Large & Small Household Appliances</option>
              <option value="Electrical & Electronic Tools">Electrical & Electronic Tools</option>
              <option value="Medical Devices">Medical Devices</option>
              <option value="Mixed / Multiple Categories">Mixed / Multiple Categories</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="estimatedVolume" className="text-sm font-semibold text-[#4A5568]">Estimated Volume (Monthly/Annual) *</label>
            <input 
              type="text" 
              id="estimatedVolume" 
              name="estimatedVolume" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all"
              placeholder="e.g. 500 Kgs / 2 Tons"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-[#4A5568]">Additional Requirements or Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[#D1D9E6] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all resize-y"
            placeholder="Tell us about your specific EPR compliance needs..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-[#629A13] hover:bg-[#528210] text-white font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#629A13]/20 flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Request...
            </span>
          ) : (
            "Submit EPR Inquiry"
          )}
        </button>
      </form>
    </div>
  );
}
