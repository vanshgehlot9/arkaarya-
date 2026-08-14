"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addTransaction(formData: FormData) {
  const supabase = createAdminClient();
  
  const type = formData.get("type") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const amountStr = formData.get("amount") as string;
  const date = formData.get("date") as string;
  const reference_id = formData.get("reference_id") as string;

  if (!type || !category || !description || !amountStr || !date) {
    return { error: "Missing required fields." };
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return { error: "Amount must be a positive number." };
  }

  const { error } = await supabase
    .from("finance_transactions")
    .insert([
      {
        type,
        category,
        description,
        amount,
        date,
        reference_id: reference_id || null,
      }
    ]);

  if (error) {
    console.error("Error adding transaction:", error);
    return { error: error.message };
  }

  // Revalidate the dashboard and finance page
  revalidatePath("/admin");
  revalidatePath("/admin/finance");
  
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from("finance_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting transaction:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/finance");
  return { success: true };
}

