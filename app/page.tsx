"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";

// Lazy-load heavy sections below the fold for faster initial page load
const WhoWeAre = dynamic(() => import("@/components/WhoWeAre").then(m => ({ default: m.WhoWeAre })));
const Services = dynamic(() => import("@/components/Services").then(m => ({ default: m.Services })));
const Timeline = dynamic(() => import("@/components/Timeline").then(m => ({ default: m.Timeline })));
const CaseStudies = dynamic(() => import("@/components/CaseStudies").then(m => ({ default: m.CaseStudies })));
const IndustriesSection = dynamic(() => import("@/components/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const SocialActivities = dynamic(() => import("@/components/SocialActivities").then(m => ({ default: m.SocialActivities })));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const Testimonials = dynamic(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const ContactSection = dynamic(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer = dynamic(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ImpactCalculator = dynamic(() => import("@/components/ImpactCalculator").then(m => ({ default: m.ImpactCalculator })));
const LeadPopup = dynamic(() => import("@/components/LeadPopup").then(m => ({ default: m.LeadPopup })));
const WhatsAppWidget = dynamic(() => import("@/components/WhatsAppWidget").then(m => ({ default: m.WhatsAppWidget })));

export default function Home() {
  const router = useRouter();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleOpenPickup = () => {
    router.push("/pickup");
  };

  const handleOpenCalculator = () => {
    setIsCalculatorOpen(true);
  };

  const handleBookWithCalculatedData = (summary: string) => {
    setIsCalculatorOpen(false);
    router.push(`/pickup?notes=Simulator Payload: ${summary}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      {/* Top Navigation Bar in Deep Blue & Eco Green */}
      <Navbar
        onOpenPickup={handleOpenPickup}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Main Page Flow — Professional Corporate Narrative */}
      <main className="flex-grow pt-[80px] md:pt-[90px]">

        {/* 1. HERO — First Impression & Primary CTA */}
        <Hero
          onOpenPickup={handleOpenPickup}
          onOpenCalculator={handleOpenCalculator}
        />

        {/* 2. TRUST BAR — Immediate Credibility with Key Metrics */}
        <StatsBar />

        {/* 3. ABOUT — Who ArkaArya Is & Corporate Vision */}
        <WhoWeAre onOpenPickup={handleOpenPickup} />

        {/* 4. SERVICES — Three Business Verticals */}
        <Services onOpenPickup={handleOpenPickup} />

        {/* 5. PROCESS — How ArkaArya Delivers (5-Stage Lifecycle) */}
        <Timeline onOpenPickup={handleOpenPickup} />

        {/* 5.1. CASE STUDIES — Proof of Work */}
        <CaseStudies />

        {/* 6. INDUSTRIES — Horizontal Showcase of Sectors Served */}
        <IndustriesSection onOpenPickup={handleOpenPickup} />

        {/* 6.5 SOCIAL ACTIVITIES — Corporate Responsibility & Community */}
        <SocialActivities />

        {/* 7. DIFFERENTIATORS — Why Choose ArkaArya */}
        <WhyChooseUs onOpenPickup={handleOpenPickup} />

        {/* 8. SOCIAL PROOF — Testimonials & Accreditations */}
        <Testimonials />

        {/* 9. CONTACT — Enterprise Inquiry & Direct CTA */}
        <ContactSection onOpenPickup={handleOpenPickup} />

      </main>

      {/* Corporate Deep Blue Footer */}
      <Footer onOpenPickup={handleOpenPickup} />

      {/* Interactive ESG Simulator Modal */}
      <ImpactCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onBookWithData={handleBookWithCalculatedData}
      />

      {/* Lead Generation Modal */}
      <LeadPopup />

      {/* Floating WhatsApp Contact Widget */}
      <WhatsAppWidget />
    </div>
  );
}
