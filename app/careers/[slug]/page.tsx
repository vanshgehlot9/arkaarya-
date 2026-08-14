import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, MapPin, Building, Clock, Briefcase } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 60; // ISR cache for 60 seconds

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: `${job.title} at ArkaArya`,
    description: job.short_description,
  };
}

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !job || job.status !== 'Open') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7]">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-[#00264A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/careers" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft size={16} />
            Back to All Roles
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-bold text-white mb-4">
                {job.department}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-blue-100 font-medium">
                <span className="flex items-center gap-1.5"><MapPin size={18} /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={18} /> {job.employment_type}</span>
                <span className="flex items-center gap-1.5"><Building size={18} /> {job.work_model}</span>
                {job.experience && <span className="flex items-center gap-1.5"><Briefcase size={18} /> {job.experience}</span>}
              </div>
            </div>
            
            <a href="#apply" className="px-8 py-4 bg-[#629A13] text-white rounded-xl font-bold hover:bg-[#528210] transition-colors whitespace-nowrap text-center">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#E3E8E4]">
            
            <div className="prose prose-lg max-w-none prose-headings:text-[#00264A] prose-p:text-[#4A5568] prose-li:text-[#4A5568]">
              <h2 className="text-2xl font-bold mb-4 text-[#00264A]">Role Overview</h2>
              <p className="mb-8">{job.overview}</p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-[#00264A]">Key Responsibilities</h2>
                  <ul className="mb-8 space-y-2 list-disc pl-5">
                    {job.responsibilities.map((req: string, idx: number) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-[#00264A]">Requirements</h2>
                  <ul className="mb-8 space-y-2 list-disc pl-5">
                    {job.requirements.map((req: string, idx: number) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {job.nice_to_have && job.nice_to_have.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-[#00264A]">Nice to Have</h2>
                  <ul className="mb-8 space-y-2 list-disc pl-5">
                    {job.nice_to_have.map((req: string, idx: number) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div id="apply" className="mt-12 pt-12 border-t border-[#E3E8E4]">
              <div className="bg-[#F8FAF7] rounded-2xl p-8 text-center border border-[#E3E8E4]">
                <h3 className="text-2xl font-bold text-[#00264A] mb-2">Ready to join us?</h3>
                <p className="text-[#4A5568] mb-6">Send your resume and a brief introduction to our team.</p>
                <a href={`mailto:careers@arkaarya.com?subject=Application: ${job.title}`} className="inline-block px-8 py-4 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors">
                  Email Application
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
