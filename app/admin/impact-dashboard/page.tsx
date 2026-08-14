import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import ImpactDashboardClient from "./ImpactDashboardClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Impact Dashboard | ArkaArya",
};

export default async function AdminImpactDashboardPage() {
  const supabase = createAdminClient();
  
  // Verify auth
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  // Fetch stats
  const { data: stats, error } = await supabase
    .from("statistics")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching stats:", error);
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load statistics: {error.message}
        </div>
      </div>
    );
  }

  return <ImpactDashboardClient initialData={stats || []} />;
}
