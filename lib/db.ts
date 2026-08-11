import { createClient } from "@supabase/supabase-js";

// ==========================================
// DATABASE ABSTRACTION LAYER
// ==========================================
// This layer is designed to be database-agnostic. Currently, it defaults to Supabase 
// using the provided keys, but it can easily be swapped to Prisma, MongoDB, or another 
// provider based on environment variables without changing the frontend or action logic.

let supabase: any = null;

// Initialize Supabase if keys are present
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for backend actions to bypass RLS
  );
}

export type PickupRequestData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  estimatedWeight: string;
  notes: string;
};

export type LeadData = {
  email: string;
  companyName?: string;
  phone?: string;
};

export type ContactMessageData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export const DB = {
  pickupRequests: {
    create: async (data: PickupRequestData) => {
      if (supabase) {
        // SUPABASE IMPLEMENTATION
        const { data: result, error } = await supabase
          .from("pickup_requests")
          .insert([
            {
              company_name: data.companyName,
              contact_person: data.contactPerson,
              email: data.email,
              phone: data.phone,
              state: data.state,
              city: data.city,
              estimated_weight: data.estimatedWeight,
              notes: data.notes,
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          console.error("Supabase Error [pickup_requests]:", error);
          throw new Error("Failed to insert pickup request into database");
        }
        return result[0];
      } else {
        // FALLBACK / OTHER DB IMPLEMENTATION (e.g. Prisma)
        // If NEXT_PUBLIC_SUPABASE_URL is removed, you can put Prisma logic here
        // e.g., return await prisma.pickupRequest.create({ data });
        console.log("Mock DB Insert [PickupRequest]:", data);
        return { id: "mock-id", ...data };
      }
    },
  },

  leads: {
    create: async (data: LeadData) => {
      if (supabase) {
        const { data: result, error } = await supabase
          .from("leads")
          .insert([
            {
              email: data.email,
              company_name: data.companyName || null,
              phone: data.phone || null,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          console.error("Supabase Error [leads]:", error);
          throw new Error("Failed to insert lead into database");
        }
        return result[0];
      } else {
        console.log("Mock DB Insert [Lead]:", data);
        return { id: "mock-id", ...data };
      }
    },
  },

  contactMessages: {
    create: async (data: ContactMessageData) => {
      if (supabase) {
        const { data: result, error } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: data.name,
              email: data.email,
              company: data.company,
              message: data.message,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          console.error("Supabase Error [contact_messages]:", error);
          throw new Error("Failed to insert contact message into database");
        }
        return result[0];
      } else {
        console.log("Mock DB Insert [ContactMessage]:", data);
        return { id: "mock-id", ...data };
      }
    },
  },
};
