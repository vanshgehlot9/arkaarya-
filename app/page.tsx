"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IndustriesSection } from "@/components/IndustriesSection";
import { StatsBar } from "@/components/StatsBar";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Services } from "@/components/Services";
import { Timeline } from "@/components/Timeline";
import { CaseStudies } from "@/components/CaseStudies";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { LeadPopup } from "@/components/LeadPopup";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

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
      <main className="flex-grow">

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
