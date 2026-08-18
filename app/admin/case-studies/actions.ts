"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addCaseStudy(formData: FormData) {
  const supabase = createAdminClient();
  
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const client_industry = formData.get("client_industry") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const results = formData.get("results") as string;
  const is_published = formData.get("is_published") === "on";
  const cover_image = formData.get("cover_image") as string;

  // Build metrics JSON
  const metrics = [];
  for (let i = 1; i <= 3; i++) {
    const value = formData.get(`metric_${i}_value`) as string;
    const label = formData.get(`metric_${i}_label`) as string;
    if (value && label) {
      metrics.push({ value, label });
    }
  }

  if (!title || !category) {
    return { error: "Missing required fields." };
  }

  // Generate slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

  const { data, error } = await supabase
    .from("case_studies")
    .insert([
      {
        title,
        slug,
        category,
        client_industry,
        location,
        description,
        challenge,
        solution,
        results,
        cover_image,
        metrics,
        is_published,
        is_featured: false,
      }
    ]);

  if (error) {
    console.error("Error adding case study:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  
  return { success: true };
}

export async function updateCaseStudy(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const client_industry = formData.get("client_industry") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const results = formData.get("results") as string;
  const is_published = formData.get("is_published") === "on" || formData.get("is_published") === "true";
  const cover_image = formData.get("cover_image") as string;

  const metrics = [];
  for (let i = 1; i <= 3; i++) {
    const value = formData.get(`metric_${i}_value`) as string;
    const label = formData.get(`metric_${i}_label`) as string;
    if (value && label) {
      metrics.push({ value, label });
    }
  }

  const { error } = await supabase
    .from("case_studies")
    .update({
      title,
      category,
      client_industry,
      location,
      description,
      challenge,
      solution,
      results,
      cover_image,
      metrics,
      is_published,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating case study:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  return { success: true };
}

export async function toggleCaseStudyPublished(id: string, is_published: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("case_studies")
    .update({ is_published })
    .eq("id", id);

  if (error) {
    console.error("Error toggling case study status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("case_studies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting case study:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  return { success: true };
}
