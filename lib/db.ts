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
  pickupId: string;
  pickupType: string;
  condition: string;
  categories: string[];
  quantity: string;
  items?: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  coordinates?: string;
  date: string;
  time: string;
  urgency: string;
  need: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  dataDestruction?: string;
  photos?: string[];
  notes?: string;
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

export type EprInquiryData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  ewasteCategory: string;
  estimatedVolume: string;
  message: string;
};

export type JobApplicationData = {
  jobId?: string; // null if general application
  name: string;
  email: string;
  phone: string;
  interest?: string;
  message?: string;
  resumeUrl?: string;
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
              pickup_id: data.pickupId,
              pickup_type: data.pickupType,
              condition: data.condition,
              categories: data.categories,
              quantity: data.quantity,
              estimated_weight: data.quantity,
              items: data.items || null,
              address: data.address,
              state: data.state,
              city: data.city,
              pincode: data.pincode,
              coordinates: data.coordinates || null,
              preferred_date: data.date,
              preferred_time: data.time,
              urgency: data.urgency,
              need: data.need,
              contact_person: data.name,
              company_name: data.company || null,
              phone: data.phone,
              email: data.email || null,
              data_destruction: data.dataDestruction || null,
              photos: data.photos || null,
              notes: data.notes || null,
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
        // FALLBACK / OTHER DB IMPLEMENTATION
        console.log("Mock DB Insert [PickupRequest]:", data);
        return { id: "mock-id", ...data };
      }
    },
  },

  storage: {
    uploadPickupPhoto: async (file: File, pickupId: string, index: number) => {
      if (supabase) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${pickupId}_${index}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("pickup-photos")
          .upload(fileName, file, { upsert: true });

        if (error) {
          console.error("Supabase Storage Error:", error);
          return null;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("pickup-photos")
          .getPublicUrl(fileName);

        return publicUrl;
      }
      return null;
    },
    uploadResume: async (file: File, email: string) => {
      if (supabase) {
        const fileExt = file.name.split('.').pop();
        // sanitize email to avoid weird path issues
        const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${safeEmail}_${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from("resumes")
          .upload(fileName, file, { upsert: true });

        if (error) {
          console.error("Supabase Storage Error (Resumes):", error);
          return null;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("resumes")
          .getPublicUrl(fileName);

        return publicUrl;
      }
      return null;
    }
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

  eprInquiries: {
    create: async (data: EprInquiryData) => {
      if (supabase) {
        const { data: result, error } = await supabase
          .from("epr_inquiries")
          .insert([
            {
              company_name: data.companyName,
              contact_person: data.contactPerson,
              email: data.email,
              phone: data.phone,
              ewaste_category: data.ewasteCategory,
              estimated_volume: data.estimatedVolume,
              message: data.message,
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          console.error("Supabase Error [epr_inquiries]:", error);
          throw new Error("Failed to insert EPR inquiry into database");
        }
        return result[0];
      } else {
        console.log("Mock DB Insert [EprInquiry]:", data);
        return { id: "mock-id", ...data };
      }
    }
  },

  jobApplications: {
    create: async (data: JobApplicationData) => {
      if (supabase) {
        const { data: result, error } = await supabase
          .from("job_applications")
          .insert([
            {
              job_id: data.jobId || null,
              name: data.name,
              email: data.email,
              phone: data.phone,
              interest: data.interest || null,
              message: data.message || null,
              resume_url: data.resumeUrl || null,
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          console.error("Supabase Error [job_applications]:", error);
          throw new Error("Failed to insert job application into database");
        }
        return result[0];
      } else {
        console.log("Mock DB Insert [JobApplication]:", data);
        return { id: "mock-id", ...data };
      }
    }
  }
};
