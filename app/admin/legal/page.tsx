import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import LegalClient from "./LegalClient";

export default async function AdminLegalPage() {
  const supabase = createAdminClient();

  const { data: documents, error } = await supabase
    .from("legal_documents")
    .select("*")
    .order("updated_at", { ascending: false });

  return <LegalClient initialData={documents || []} />;
}
