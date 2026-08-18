import React from "react";
import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { processHtmlForToc } from "@/lib/htmlProcessor";
import { TableOfContents } from "@/components/TableOfContents";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createClient();
  const { data: doc } = await supabase
    .from("legal_documents")
    .select("title, summary")
    .eq("slug", params.slug)
    .single();

  if (!doc) return { title: "Not Found | ArkaArya" };

  return {
    title: `${doc.title} | ArkaArya Legal`,
    description: doc.summary || "ArkaArya Legal Document",
  };
}

export default async function LegalDocumentPage({ params, searchParams }: { params: { slug: string }, searchParams: { preview?: string } }) {
  const supabase = createClient();
  const isPreview = searchParams.preview === "true";

  let query = supabase.from("legal_documents").select("*").eq("slug", params.slug);
  
  // If not preview mode, only allow published
  if (!isPreview) {
    query = query.eq("status", "published");
  }

  const { data: doc } = await query.single();

  if (!doc) {
    notFound();
  }

  const { processedHtml, headings } = processHtmlForToc(doc.content);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />

      {isPreview && (
        <div className="fixed top-[80px] md:top-[90px] left-0 right-0 bg-amber-500 text-white text-center py-2 text-sm font-bold z-40 shadow-md">
          PREVIEW MODE — This document is not currently published.
        </div>
      )}

      <main className={`flex-grow ${isPreview ? 'pt-[120px] md:pt-[130px]' : 'pt-[80px] md:pt-[90px]'} pb-24`}>
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-4">
          <nav className="flex items-center text-sm font-medium text-[#5E6672]">
            <Link href="/" className="hover:text-[#00264A] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Legal</span>
            <span className="mx-2">/</span>
            <span className="text-[#00264A]">{doc.title}</span>
          </nav>
        </div>

        {/* Legal Hero */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 border-b border-[#E3E8E4]">
          <div className="max-w-3xl">
            <div className="text-[#629A13] text-sm font-bold tracking-widest uppercase mb-4">
              LEGAL & POLICIES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] mb-6 leading-tight">
              {doc.title}
            </h1>
            {doc.summary && (
              <p className="text-lg md:text-xl text-[#5E6672] mb-12 max-w-2xl font-sans">
                {doc.summary}
              </p>
            )}

            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Effective Date</p>
                <p className="text-[#5E6672] text-sm">{doc.effective_date ? format(new Date(doc.effective_date), "dd MMMM yyyy") : format(new Date(doc.updated_at), "dd MMMM yyyy")}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-[#5E6672] text-sm">{format(new Date(doc.updated_at), "dd MMMM yyyy")}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">Version</p>
                <p className="text-[#5E6672] text-sm">{doc.version}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
            
            {/* Sticky Sidebar / Mobile Dropdown */}
            <aside className="w-full lg:w-72 shrink-0">
               <TableOfContents headings={headings} />
            </aside>

            {/* Document Content Area */}
            <div className="flex-1 max-w-3xl">
              <article 
                className="prose prose-lg prose-blue max-w-none text-[#5E6672] prose-headings:font-serif prose-headings:text-[#00264A] prose-a:text-[#629A13] prose-a:no-underline hover:prose-a:underline prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:flex prose-h2:items-baseline prose-h2:gap-3 prose-h3:text-xl prose-h3:mt-8 [counter-reset:h2-counter] prose-h2:[counter-increment:h2-counter] prose-h2:before:content-[counter(h2-counter)_'.'] prose-h2:before:text-[#629A13] prose-h2:before:opacity-60 prose-h2:before:font-mono prose-h2:before:text-xl"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
