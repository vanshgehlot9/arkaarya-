import React from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import MaintenanceView from "./MaintenanceView";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );

  // Fetch settings using standard fetch to cache if possible, or use Supabase
  const { data: settings } = await supabase
    .from("site_settings")
    .select("maintenance_mode")
    .eq("id", 1)
    .single();

  if (settings?.maintenance_mode) {
    return <MaintenanceView />;
  }

  return <>{children}</>;
}
