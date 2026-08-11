"use server";

import { z } from "zod";
import { DB } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };

    // Validate using Zod
    const validatedData = contactSchema.parse(rawData);

    // Save to Database via abstraction layer
    const result = await DB.contactMessages.create(validatedData);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Contact submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors[0].message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
