import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import PickupsClient from "./PickupsClient";

export const revalidate = 0; // Dynamic rendering

export default async function PickupsPage() {
  const supabase = createAdminClient();
  
  // Fetch Pickups
  const { data: pickups, error } = await supabase
    .from("pickup_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pickups:", error);
  }

  return <PickupsClient initialData={pickups || []} />;
}

