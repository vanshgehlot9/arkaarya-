import React from "react";
import TeamClient from "./TeamClient";
import { getTeamMembers } from "./actions";
import { Users } from "lucide-react";

export const revalidate = 0;

export default async function TeamPage() {
  const users = await getTeamMembers();

  // Supabase Auth Admin returns users with this structure roughly:
  // { id, email, created_at, last_sign_in_at, banned_until, app_metadata, user_metadata }
  const formattedUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at,
    is_banned: user.banned_until != null, // simplified check
  }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A] flex items-center gap-2">
            <Users size={24} className="text-[#629A13]" />
            Team Management
          </h1>
          <p className="text-[#4A5568] text-sm mt-1">
            Manage admin users, send invitations, and control access.
          </p>
        </div>
      </div>

      <TeamClient initialUsers={formattedUsers} />
    </div>
  );
}
