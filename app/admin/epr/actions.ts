"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function updateEprStatus(id: string, status: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("epr_inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating EPR status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/epr");
  return { success: true };
}
