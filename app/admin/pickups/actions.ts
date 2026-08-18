"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function updatePickupStatus(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  if (!id || !status) {
    return { error: "Missing required fields." };
  }

  // Update the pickup status
  const { error: updateError } = await supabase
    .from("pickup_requests")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating pickup status:", updateError);
    return { error: updateError.message };
  }

  revalidatePath(`/admin/pickups/${id}`);
  revalidatePath("/admin/pickups");
  
  return { success: true };
}

export async function deletePickup(id: string) {
  const supabase = createAdminClient();

  // Due to foreign key constraints, we might need to delete history first,
  // or rely on ON DELETE CASCADE. Let's assume CASCADE is set, or just delete the pickup.
  const { error } = await supabase
    .from("pickup_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting pickup:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/pickups");
  return { success: true };
}

