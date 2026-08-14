import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client — uses the Service Role Key to BYPASS RLS.
 * Use ONLY in server-side code (Server Components, Route Handlers, Server Actions).
 * NEVER expose this to the client browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase admin credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  return createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
