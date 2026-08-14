"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const supabase = createAdminClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const media_url = formData.get("media_url") as string;
  const media_type = formData.get("media_type") as string;
  const category = formData.get("category") as string;
  const activity_date = formData.get("activity_date") as string;
  const is_published = formData.get("is_published") === "true";

  const { error } = await supabase.from("social_activities").insert([
    {
      title,
      description,
      media_url,
      media_type,
      category,
      activity_date: activity_date || null,
      is_published,
    },
  ]);

  if (error) {
    console.error("Error adding activity:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/social-activities");
  revalidatePath("/");
  return { success: true };
}

export async function updateActivity(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const media_url = formData.get("media_url") as string;
  const media_type = formData.get("media_type") as string;
  const category = formData.get("category") as string;
  const activity_date = formData.get("activity_date") as string;
  const is_published = formData.get("is_published") === "true";

  const { error } = await supabase
    .from("social_activities")
    .update({
      title,
      description,
      media_url,
      media_type,
      category,
      activity_date: activity_date || null,
      is_published,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating activity:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/social-activities");
  revalidatePath("/");
  return { success: true };
}

export async function toggleActivityPublished(id: string, is_published: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("social_activities")
    .update({ is_published })
    .eq("id", id);

  if (error) {
    console.error("Error toggling activity status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/social-activities");
  revalidatePath("/");
  return { success: true };
}

export async function deleteActivity(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("social_activities")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting activity:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/social-activities");
  revalidatePath("/");
  return { success: true };
}
