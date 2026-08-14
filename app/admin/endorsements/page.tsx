import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import EndorsementsClient from "./EndorsementsClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Endorsements | ArkaArya",
};

export default async function AdminEndorsementsPage() {
  const supabase = createAdminClient();
  
  // Verify auth
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  // Fetch endorsements
  const { data: endorsements, error } = await supabase
    .from("client_endorsements")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching endorsements:", error);
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load endorsements: {error.message}
        </div>
      </div>
    );
  }

  return <EndorsementsClient initialData={endorsements || []} />;
}
