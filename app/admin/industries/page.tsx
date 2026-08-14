import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import IndustriesClient from "./IndustriesClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Industries | ArkaArya",
};

export default async function AdminIndustriesPage() {
  const supabase = createAdminClient();
  
  // Verify auth
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  // Fetch industries
  const { data: industries, error } = await supabase
    .from("industries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching industries:", error);
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load industries: {error.message}
        </div>
      </div>
    );
  }

  return <IndustriesClient initialData={industries || []} />;
}
