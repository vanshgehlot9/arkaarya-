import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import SocialActivitiesClient from "./SocialActivitiesClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Social Activities | ArkaArya",
};

export default async function AdminSocialActivitiesPage() {
  const supabase = createAdminClient();
  
  // Verify auth
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  // Fetch activities
  const { data: activities, error } = await supabase
    .from("social_activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching social activities:", error);
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load social activities: {error.message}
        </div>
      </div>
    );
  }

  return <SocialActivitiesClient initialData={activities || []} />;
}
