"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function updateService(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const cta_text = formData.get("cta_text") as string;
  const link = formData.get("link") as string;
  const identifier = formData.get("identifier") as string;
  const image_url = formData.get("image_url") as string;
  
  // Extract features array
  const features = [];
  for (let i = 1; i <= 3; i++) {
    const feature = formData.get(`feature_${i}`) as string;
    if (feature && feature.trim() !== "") {
      features.push(feature.trim());
    }
  }

  const updateData: any = {
    name,
    category,
    description,
    features,
    cta_text,
    link,
    identifier
  };

  if (image_url !== null) {
    updateData.image_url = image_url;
  }

  const { error } = await supabase
    .from("services")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating service:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function toggleServicePublished(id: string, is_published: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("services")
    .update({ is_published })
    .eq("id", id);

  if (error) {
    console.error("Error toggling service status:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function addServiceSolution(formData: FormData) {
  const supabase = createAdminClient();
  const service_id = formData.get("service_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon_name = formData.get("icon_name") as string;

  // Get next order index
  const { data: existing } = await supabase
    .from("service_solutions")
    .select("order_index")
    .eq("service_id", service_id)
    .order("order_index", { ascending: false })
    .limit(1);
    
  const nextOrder = existing && existing.length > 0 ? existing[0].order_index + 1 : 1;

  const { error } = await supabase.from("service_solutions").insert({
    service_id,
    title,
    description,
    icon_name,
    order_index: nextOrder
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services/green");
  revalidatePath("/services/renew");
  revalidatePath("/services/quantum");
  return { success: true };
}

export async function updateServiceSolution(formData: FormData) {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon_name = formData.get("icon_name") as string;

  const { error } = await supabase
    .from("service_solutions")
    .update({ title, description, icon_name })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services/green");
  revalidatePath("/services/renew");
  revalidatePath("/services/quantum");
  return { success: true };
}

export async function deleteServiceSolution(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("service_solutions").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services/green");
  revalidatePath("/services/renew");
  revalidatePath("/services/quantum");
  return { success: true };
}
