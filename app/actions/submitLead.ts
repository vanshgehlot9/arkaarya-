"use server";

import { z } from "zod";
import { DB } from "@/lib/db";

const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
});

export async function submitLead(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      companyName: formData.get("companyName") as string,
      phone: formData.get("phone") as string,
    };

    // Validate using Zod
    const validatedData = leadSchema.parse(rawData);

    // Save to Database via abstraction layer
    const result = await DB.leads.create(validatedData);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Lead submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors[0].message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
