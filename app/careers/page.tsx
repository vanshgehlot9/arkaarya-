import React from "react";
import { CareersHero } from "@/components/careers/CareersHero";
import { OurCulture } from "@/components/careers/OurCulture";
import { OpenPositions } from "@/components/careers/OpenPositions";
import { WhyArkaArya } from "@/components/careers/WhyArkaArya";
import { GeneralApplication } from "@/components/careers/GeneralApplication";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase-server";

export const revalidate = 0;

export default async function CareersPage() {
  const supabase = createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "Open")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F8FAF7]">
      <Navbar />
      <CareersHero />
      <WhyArkaArya />
      <OurCulture />
      <OpenPositions initialJobs={jobs || []} />
      <GeneralApplication />
      <Footer />
    </main>
  );
}
