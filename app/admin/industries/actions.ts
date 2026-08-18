"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addIndustry(formData: FormData) {
  const supabase = createAdminClient();
  
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const icon_name = formData.get("icon_name") as string;
  const illustration_name = formData.get("illustration_name") as string;
  const theme_color = "blue";
  const is_active = true;

  const { error } = await supabase.from("industries").insert([
    {
      name,
      description,
      icon_name,
      illustration_name,
      theme_color,
      is_active,
    },
  ]);

  if (error) {
    console.error("Error adding industry:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/industries");
  revalidatePath("/");
  return { success: true };
}

export async function updateIndustry(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const icon_name = formData.get("icon_name") as string;
  const illustration_name = formData.get("illustration_name") as string;

  const { error } = await supabase
    .from("industries")
    .update({
      name,
      description,
      icon_name,
      illustration_name,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating industry:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/industries");
  revalidatePath("/");
  return { success: true };
}

export async function toggleIndustryActive(id: string, is_active: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("industries")
    .update({ is_active })
    .eq("id", id);

  if (error) {
    console.error("Error toggling industry status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/industries");
  revalidatePath("/");
  return { success: true };
}

export async function deleteIndustry(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("industries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting industry:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/industries");
  revalidatePath("/");
  return { success: true };
}
