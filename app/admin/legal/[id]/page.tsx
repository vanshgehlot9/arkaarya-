import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import EditLegalClient from "./EditLegalClient";

export default async function AdminEditLegalPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();

  const { data: doc, error } = await supabase
    .from("legal_documents")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !doc) {
    redirect("/admin/legal");
  }

  return <EditLegalClient initialData={doc} />;
}
