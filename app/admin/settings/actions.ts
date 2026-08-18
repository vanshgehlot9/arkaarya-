"use server";

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function toggleMaintenanceMode(currentState: boolean) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("site_settings")
    .update({ maintenance_mode: !currentState, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    console.error("Error updating maintenance mode:", error);
    return { error: "Failed to update maintenance mode" };
  }

  // Revalidate public layouts
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  
  return { success: true };
}

export async function inviteAdminUser(email: string) {
  const adminAuthClient = createAdminClient().auth.admin;
  
  const { data, error } = await adminAuthClient.inviteUserByEmail(email, {
    data: { role: 'admin' }
  });

  if (error) {
    console.error("Error inviting user:", error);
    return { error: error.message };
  }

  return { success: true };
}

export async function changeAdminPassword(password: string) {
  const supabase = createClient();
  
  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    console.error("Error changing password:", error);
    return { error: error.message };
  }

  return { success: true };
}
