"use server";

import { z } from "zod";
import { DB } from "@/lib/db";

const pickupSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  estimatedWeight: z.string().min(1, "Estimated weight is required"),
  notes: z.string().optional().default(""),
});

export async function submitPickupRequest(formData: FormData) {
  try {
    const rawData = {
      companyName: formData.get("companyName") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      estimatedWeight: formData.get("estimatedWeight") as string,
      notes: formData.get("notes") as string,
    };

    // Validate using Zod
    const validatedData = pickupSchema.parse(rawData);

    // Save to Database via abstraction layer
    const result = await DB.pickupRequests.create(validatedData);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Pickup submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError<any>).errors[0].message };
    }
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
