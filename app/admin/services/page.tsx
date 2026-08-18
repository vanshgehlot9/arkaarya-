import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import ServicesClient from "./ServicesClient";

export default async function AdminServicesPage() {
  const supabase = createAdminClient();

  // Attempt to fetch services. If table doesn't exist, this will error safely.
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  return <ServicesClient initialData={services || []} />;
}
