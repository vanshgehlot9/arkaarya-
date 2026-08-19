import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  
  // Sign out from Supabase (clears the session cookie)
  await supabase.auth.signOut();
  
  // Redirect back to login page
  return NextResponse.redirect(new URL('/admin/login', request.url));
}
