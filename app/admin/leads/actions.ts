"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = createAdminClient();
  
  if (!id || !status) {
    return { error: "Missing required fields." };
  }

  const { error: updateError } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating lead status:", updateError);
    return { error: updateError.message };
  }

  revalidatePath(`/admin/leads`);
  
  return { success: true };
}

export async function deleteLead(id: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting lead:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  return { success: true };
}

