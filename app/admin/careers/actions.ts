"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addJob(formData: FormData) {
  const supabase = createAdminClient();
  
  const title = formData.get("title") as string;
  const department = formData.get("department") as string;
  const location = formData.get("location") as string;
  const employment_type = formData.get("employment_type") as string;
  const experience = formData.get("experience") as string;
  const short_description = formData.get("short_description") as string;
  const overview = formData.get("overview") as string;
  const work_model = formData.get("work_model") as string;
  
  const responsibilities = (formData.get("responsibilities") as string || "").split("\n").filter(i => i.trim());
  const requirements = (formData.get("requirements") as string || "").split("\n").filter(i => i.trim());
  const nice_to_have = (formData.get("nice_to_have") as string || "").split("\n").filter(i => i.trim());

  if (!title || !department || !location) {
    return { error: "Missing required fields." };
  }

  // Generate slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        title,
        slug,
        department,
        location,
        employment_type,
        experience,
        short_description,
        overview,
        work_model,
        responsibilities,
        requirements,
        nice_to_have,
        status: "Open"
      }
    ]);

  if (error) {
    console.error("Error adding job:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  
  return { success: true };
}

export async function toggleJobStatus(id: string, currentStatus: string) {
  const supabase = createAdminClient();
  const newStatus = currentStatus === "Open" ? "Closed" : "Open";

  const { error } = await supabase
    .from("jobs")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    console.error("Error toggling job status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath("/careers");

  return { success: true };
}

export async function deleteJob(id: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting job:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateApplicationStatus(id: string, status: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("job_applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating application status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/careers");
  return { success: true };
}

