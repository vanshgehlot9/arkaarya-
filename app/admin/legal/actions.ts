"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function createLegalDocument(data: {
  title: string;
  slug: string;
  document_type: string;
  effective_date: string;
}) {
  const supabase = createAdminClient();

  const { data: doc, error } = await supabase
    .from("legal_documents")
    .insert([
      {
        title: data.title,
        slug: data.slug,
        document_type: data.document_type,
        effective_date: data.effective_date || null,
        content: "<h2>1. Introduction</h2><p>Start writing your document here...</p>",
        status: "draft",
        version: "1.0",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating legal doc:", error);
    return { error: error.message };
  }

  // Add history
  await supabase.from("legal_documents_history").insert([{
    document_id: doc.id,
    title: doc.title,
    content: doc.content,
    version: doc.version,
    status: doc.status,
    action: "created"
  }]);

  revalidatePath("/admin/legal");
  return { success: true, id: doc.id };
}

export async function updateLegalDocument(id: string, updates: any) {
  const supabase = createAdminClient();

  const { data: doc, error } = await supabase
    .from("legal_documents")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating legal doc:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/legal/${id}`);
  revalidatePath("/admin/legal");
  revalidatePath("/legal");
  if (doc.slug) revalidatePath(`/legal/${doc.slug}`);
  
  return { success: true, doc };
}

export async function publishLegalDocument(id: string) {
  const supabase = createAdminClient();

  // First fetch the document to save to history
  const { data: doc, error: fetchErr } = await supabase
    .from("legal_documents")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchErr || !doc) return { error: fetchErr?.message || "Not found" };

  const { error } = await supabase
    .from("legal_documents")
    .update({ status: "published", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  await supabase.from("legal_documents_history").insert([{
    document_id: doc.id,
    title: doc.title,
    content: doc.content,
    version: doc.version,
    status: "published",
    action: "published"
  }]);

  revalidatePath("/admin/legal");
  revalidatePath("/legal");
  if (doc.slug) revalidatePath(`/legal/${doc.slug}`);

  return { success: true };
}

export async function unpublishLegalDocument(id: string) {
  const supabase = createAdminClient();

  const { data: doc } = await supabase.from("legal_documents").select("*").eq("id", id).single();
  if (!doc) return { error: "Not found" };

  const { error } = await supabase
    .from("legal_documents")
    .update({ status: "draft", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  await supabase.from("legal_documents_history").insert([{
    document_id: doc.id,
    title: doc.title,
    content: doc.content,
    version: doc.version,
    status: "draft",
    action: "unpublished"
  }]);

  revalidatePath("/admin/legal");
  revalidatePath("/legal");
  if (doc.slug) revalidatePath(`/legal/${doc.slug}`);

  return { success: true };
}

export async function archiveLegalDocument(id: string) {
  const supabase = createAdminClient();

  const { data: doc } = await supabase.from("legal_documents").select("*").eq("id", id).single();
  if (!doc) return { error: "Not found" };

  const { error } = await supabase
    .from("legal_documents")
    .update({ status: "archived", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  await supabase.from("legal_documents_history").insert([{
    document_id: doc.id,
    title: doc.title,
    content: doc.content,
    version: doc.version,
    status: "archived",
    action: "archived"
  }]);

  revalidatePath("/admin/legal");
  revalidatePath("/legal");
  if (doc.slug) revalidatePath(`/legal/${doc.slug}`);

  return { success: true };
}
