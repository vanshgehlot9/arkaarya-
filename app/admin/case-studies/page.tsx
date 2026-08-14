import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import CaseStudiesClient from "./CaseStudiesClient";

export const revalidate = 0;

export default async function CaseStudiesPage() {
  const supabase = createAdminClient();

  const { data: caseStudies, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching case studies:", error);
  }

  return <CaseStudiesClient initialData={caseStudies || []} />;
}

