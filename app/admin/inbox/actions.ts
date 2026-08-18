"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "read" })
    .eq("id", id);
    
  if (error) return { error: error.message };
  revalidatePath("/admin/inbox");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/inbox");
  return { success: true };
}
