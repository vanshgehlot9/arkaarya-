import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ArkaArya",
  description: "Get in touch with ArkaArya's enterprise logistics and compliance team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      
      <main className="flex-grow pt-[120px]">
        {/* We use the exact same ContactSection component, but wrapped in a dedicated page */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 mb-8">
          <div className="text-[11px] font-bold text-[#629A13] uppercase tracking-widest mb-4">
            ENTERPRISE SUPPORT
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-[#5E6672] text-lg max-w-2xl leading-relaxed">
            Reach out to our team for enterprise recycling, IT asset disposal, EPR compliance, and sustainable energy solutions.
          </p>
        </div>

        {/* The reusable contact form section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
