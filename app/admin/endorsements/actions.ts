"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addEndorsement(formData: FormData) {
  const supabase = createAdminClient();
  
  const quote = formData.get("quote") as string;
  const author_name = formData.get("author_name") as string;
  const author_role = formData.get("author_role") as string;
  const author_company = formData.get("author_company") as string;
  const rating = Number(formData.get("rating"));
  const display_order = Number(formData.get("display_order") || 0);
  const is_published = formData.get("is_published") === "true";

  const { error } = await supabase.from("client_endorsements").insert([
    {
      quote,
      author_name,
      author_role,
      author_company,
      rating,
      display_order,
      is_published,
    },
  ]);

  if (error) {
    console.error("Error adding endorsement:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/endorsements");
  revalidatePath("/");
  return { success: true };
}

export async function updateEndorsement(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const quote = formData.get("quote") as string;
  const author_name = formData.get("author_name") as string;
  const author_role = formData.get("author_role") as string;
  const author_company = formData.get("author_company") as string;
  const rating = Number(formData.get("rating"));
  const display_order = Number(formData.get("display_order") || 0);
  const is_published = formData.get("is_published") === "true";

  const { error } = await supabase
    .from("client_endorsements")
    .update({
      quote,
      author_name,
      author_role,
      author_company,
      rating,
      display_order,
      is_published,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating endorsement:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/endorsements");
  revalidatePath("/");
  return { success: true };
}

export async function toggleEndorsementPublished(id: string, is_published: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("client_endorsements")
    .update({ is_published })
    .eq("id", id);

  if (error) {
    console.error("Error toggling endorsement status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/endorsements");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEndorsement(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("client_endorsements")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting endorsement:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/endorsements");
  revalidatePath("/");
  return { success: true };
}
