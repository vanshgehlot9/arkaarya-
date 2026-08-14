"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addStat(formData: FormData) {
  const supabase = createAdminClient();
  
  const value_key = formData.get("value_key") as string;
  const label = formData.get("label") as string;
  const numeric_value = Number(formData.get("numeric_value"));
  const value = String(numeric_value);
  const unit = formData.get("unit") as string;
  const description = formData.get("description") as string;
  const display_order = Number(formData.get("display_order") || 0);
  const is_active = formData.get("is_active") === "true";

  const { error } = await supabase.from("statistics").insert([
    {
      value_key,
      label,
      numeric_value,
      value, // the text column required by phase 3
      unit,
      description,
      display_order,
      is_active,
    },
  ]);

  if (error) {
    console.error("Error adding stat:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/impact-dashboard");
  revalidatePath("/");
  return { success: true };
}

export async function updateStat(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const value_key = formData.get("value_key") as string;
  const label = formData.get("label") as string;
  const numeric_value = Number(formData.get("numeric_value"));
  const value = String(numeric_value);
  const unit = formData.get("unit") as string;
  const description = formData.get("description") as string;
  const display_order = Number(formData.get("display_order") || 0);
  const is_active = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("statistics")
    .update({
      value_key,
      label,
      numeric_value,
      value,
      unit,
      description,
      display_order,
      is_active,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating stat:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/impact-dashboard");
  revalidatePath("/");
  return { success: true };
}

export async function toggleStatActive(id: string, is_active: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("statistics")
    .update({ is_active })
    .eq("id", id);

  if (error) {
    console.error("Error toggling stat status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/impact-dashboard");
  revalidatePath("/");
  return { success: true };
}

export async function deleteStat(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("statistics")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting stat:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/impact-dashboard");
  revalidatePath("/");
  return { success: true };
}
