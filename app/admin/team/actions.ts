"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  const supabase = createAdminClient();
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
  return users;
}

export async function createTeamMember(email: string, password?: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: password || "ArkaArya@123", // default password if not provided
    email_confirm: true,
  });

  if (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/team");
  
  return { 
    success: true, 
    user: data.user 
  };
}

export async function inviteTeamMember(email: string) {
  const supabase = createAdminClient();
  
  // Directly invite the user (sends email if SMTP is configured, and creates user in Auth)
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

  if (error) {
    console.error("Error inviting user:", error);
    return { success: false, error: error.message };
  }

  // Generate an invite link just in case the email doesn't go through
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: 'invite',
    email: email
  });

  revalidatePath("/admin/team");
  
  return { 
    success: true, 
    user: data.user, 
    inviteLink: linkError ? null : linkData.properties.action_link 
  };
}

export async function deleteTeamMember(userId: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/team");
  return { success: true };
}

export async function toggleTeamMemberStatus(userId: string, currentStatus: boolean) {
  const supabase = createAdminClient();
  
  // We can "block" a user by banning them or updating user_metadata
  // Supabase has an admin.updateUserById method that can set ban_duration
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: currentStatus ? "87600h" : "none" // 10 years ban or unban
  });

  if (error) {
    console.error("Error updating user status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/team");
  return { success: true };
}
