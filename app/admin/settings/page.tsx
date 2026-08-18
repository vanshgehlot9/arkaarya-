import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import SettingsClient from "./SettingsClient";

export const revalidate = 0; // Ensure fresh DB read on load

export default async function SettingsPage() {
  const supabase = createAdminClient();
  
  // Fetch initial settings, fallback to false if fails
  const { data: settings, error } = await supabase
    .from("site_settings")
    .select("maintenance_mode")
    .eq("id", 1)
    .single();

  if (error && error.code !== "PGRST116") { // Ignore no rows found initially
    console.error("Error fetching site settings:", error);
  }

  const initialMaintenanceMode = settings?.maintenance_mode || false;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Platform Settings</h1>
          <p className="text-[#4A5568] text-sm mt-1">Configure global site behavior, security, and access.</p>
        </div>
      </div>
      
      <SettingsClient initialMaintenanceMode={initialMaintenanceMode} />
    </div>
  );
}
