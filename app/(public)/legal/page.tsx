import React from "react";
import { createClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Scale, FileText } from "lucide-react";
import { format } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Compliance | ArkaArya",
  description: "Policies and terms governing your use of ArkaArya services and platforms.",
};

export default async function LegalIndexPage() {
  const supabase = createClient();
  const { data: documents } = await supabase
    .from("legal_documents")
    .select("*")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      
      <main className="flex-grow pt-[120px] pb-24">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] text-xs font-bold tracking-wider uppercase shadow-sm mb-6">
              <Scale size={14} className="text-[#629A13]" />
              <span>Legal Center</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] tracking-tight mb-6">
              Legal & Compliance
            </h1>
            <p className="text-lg text-[#5E6672] max-w-2xl leading-relaxed">
              Policies and terms governing your use of ArkaArya services and platforms.
            </p>
          </div>

          {/* List of Documents */}
          <div className="grid gap-4">
            {documents && documents.length > 0 ? documents.map((doc) => (
              <Link 
                key={doc.id} 
                href={`/legal/${doc.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-white border border-[#E3E8E4] rounded-2xl hover:border-[#629A13] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-12 h-12 bg-[#F8FAF7] rounded-xl flex items-center justify-center text-[#00264A] shrink-0 group-hover:bg-[#629A13] group-hover:text-white transition-colors duration-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#00264A] group-hover:text-[#629A13] transition-colors">{doc.title}</h2>
                    <p className="text-[#5E6672] mt-2 mb-4 sm:mb-0 text-sm max-w-xl">{doc.summary}</p>
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-[#E3E8E4] pt-4 sm:pt-0 sm:pl-8">
                  <span className="text-xs font-semibold text-[#5E6672] uppercase tracking-wider">
                    Updated {format(new Date(doc.updated_at), "dd MMM yyyy")}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#00264A] group-hover:text-[#629A13] transition-colors">
                    Read Document <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )) : (
              <div className="p-12 bg-white border border-[#E3E8E4] rounded-2xl text-center">
                <Scale size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-[#00264A] mb-2">No Documents Available</h3>
                <p className="text-[#5E6672]">Legal documents have not been published yet.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
