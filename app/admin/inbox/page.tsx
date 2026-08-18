import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import InboxClient from "./InboxClient";

export const revalidate = 0;

export default async function InboxPage() {
  const supabase = createAdminClient();
  
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
  }

  return <InboxClient initialMessages={messages || []} />;
}
