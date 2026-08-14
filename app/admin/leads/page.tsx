import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import LeadsClient from "./LeadsClient";

export const revalidate = 0; // Dynamic rendering

export default async function LeadsPage() {
  const supabase = createAdminClient();
  
  // Fetch Leads
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
  }

  return <LeadsClient initialData={leads || []} />;
}

