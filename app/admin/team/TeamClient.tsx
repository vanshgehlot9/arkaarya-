"use client";

import React, { useState } from "react";
import { UserPlus, ShieldAlert, CheckCircle2, Trash2, Mail, Link as LinkIcon, Loader2, Edit2, X } from "lucide-react";
import { inviteTeamMember, deleteTeamMember, toggleTeamMemberStatus, createTeamMember, updateTeamMember } from "./actions";

export default function TeamClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [mode, setMode] = useState<"invite" | "create">("invite");
  const [loading, setLoading] = useState(false);
  const [inviteResult, setInviteResult] = useState<{ link?: string, error?: string, message?: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInviteResult(null);

    if (mode === "invite") {
      const res = await inviteTeamMember(inviteEmail, inviteName);
      if (res.success) {
        setInviteResult({ link: res.inviteLink || "", message: "Invite created successfully!" });
        setUsers([...users, {
          id: res.user?.id || Date.now().toString(),
          email: inviteEmail,
          name: inviteName,
          created_at: new Date().toISOString(),
          is_banned: false
        }]);
      } else {
        setInviteResult({ error: res.error });
      }
    } else {
      const res = await createTeamMember(inviteEmail, createPassword, inviteName);
      if (res.success) {
        setInviteResult({ message: "User created successfully! They can now log in." });
        setUsers([...users, {
          id: res.user?.id || Date.now().toString(),
          email: inviteEmail,
          name: inviteName,
          created_at: new Date().toISOString(),
          is_banned: false
        }]);
      } else {
        setInviteResult({ error: res.error });
      }
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to completely delete ${email}? This cannot be undone.`)) return;
    
    const res = await deleteTeamMember(id);
    if (res.success) {
      setUsers(users.filter(u => u.id !== id));
    } else {
      alert("Error deleting user: " + res.error);
    }
  };

  const handleToggleBlock = async (id: string, currentlyBanned: boolean) => {
    const action = currentlyBanned ? "Unblock" : "Block";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    const res = await toggleTeamMemberStatus(id, !currentlyBanned);
    if (res.success) {
      setUsers(users.map(u => u.id === id ? { ...u, is_banned: !currentlyBanned } : u));
    } else {
      alert("Error updating status: " + res.error);
    }
  };

  const copyLink = () => {
    if (inviteResult?.link) {
      navigator.clipboard.writeText(inviteResult.link);
      alert("Invite link copied to clipboard!");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    
    const res = await updateTeamMember(editingUser.id, { 
      name: editName, 
      password: editPassword || undefined 
    });
    
    if (res.success) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: editName } : u));
      setShowEditModal(false);
    } else {
      alert("Error updating user: " + res.error);
    }
    setLoading(false);
  };
  
  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditName(user.name || "");
    setEditPassword("");
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex justify-end">
        <button 
          onClick={() => { setShowInviteModal(true); setInviteResult(null); setInviteEmail(""); setInviteName(""); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#629A13] text-white rounded-lg text-sm font-semibold hover:bg-[#528210] transition-colors"
        >
          <UserPlus size={16} />
          Invite Team Member
        </button>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-[#4A5568]">
              <tr>
                <th className="px-6 py-4 font-semibold">User Email</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Last Sign In</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No team members found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#00264A] flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00264A]/10 flex items-center justify-center text-[#00264A] font-bold">
                        {user.name?.[0]?.toUpperCase() || user.email?.[0].toUpperCase()}
                      </div>
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">{user.name || "-"}</td>
                    <td className="px-6 py-4">
                      {user.is_banned ? (
                        <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                          <ShieldAlert size={12} /> Blocked
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {user.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="px-3 py-1.5 bg-gray-50 text-[#5E6672] hover:bg-gray-200 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => handleToggleBlock(user.id, user.is_banned)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          user.is_banned ? "bg-[#F8FAF7] text-[#00264A] hover:bg-gray-200" : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {user.is_banned ? "Unblock" : "Block"}
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.email)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">Add Team Member</h2>
              
              {!inviteResult && (
                <div className="flex gap-2 mt-4 p-1 bg-gray-100 rounded-lg">
                  <button 
                    type="button"
                    onClick={() => setMode("invite")}
                    className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${mode === "invite" ? "bg-white text-[#00264A] shadow-sm" : "text-gray-500 hover:text-[#00264A]"}`}
                  >
                    Send Invite Link
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode("create")}
                    className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${mode === "create" ? "bg-white text-[#00264A] shadow-sm" : "text-gray-500 hover:text-[#00264A]"}`}
                  >
                    Create Manually
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {!inviteResult ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Full Name (Optional)</label>
                    <input 
                      type="text" 
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                      placeholder="e.g. John Doe" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address (e.g. user@example.com)"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                      placeholder="colleague@arkaarya.com" 
                    />
                  </div>

                  {mode === "create" && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                      <label className="text-sm font-semibold text-[#00264A]">Assign Password</label>
                      <input 
                        type="password" 
                        required={mode === "create"}
                        value={createPassword}
                        onChange={(e) => setCreatePassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                        placeholder="••••••••" 
                      />
                      <p className="text-xs text-gray-500 mt-1">They will use this password to log in.</p>
                    </div>
                  )}
                  
                  <div className="pt-2 flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 py-2.5 bg-[#F8FAF7] text-[#4A5568] rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 py-2.5 bg-[#629A13] text-white rounded-xl font-bold hover:bg-[#528210] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <><UserPlus size={16} /> {mode === 'invite' ? 'Send Invite' : 'Create User'}</>}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {inviteResult.error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium">
                      Error: {inviteResult.error}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 font-medium flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        {inviteResult.message}
                      </div>
                      
                      {inviteResult.link && (
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-[#00264A]">Manual Invite Link</label>
                          <div className="flex items-center gap-2">
                            <input 
                              readOnly 
                              value={inviteResult.link} 
                              className="flex-1 px-4 py-2.5 rounded-xl border border-[#E3E8E4] bg-[#F8FAF7] text-sm text-gray-600 outline-none"
                            />
                            <button 
                              onClick={copyLink}
                              className="p-2.5 bg-[#00264A] text-white rounded-xl hover:bg-[#001A33] transition-colors shrink-0"
                              title="Copy Link"
                            >
                              <LinkIcon size={18} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">You can copy this link and send it directly via WhatsApp or Email.</p>
                        </div>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={() => setShowInviteModal(false)}
                    className="w-full py-2.5 bg-[#F8FAF7] text-[#00264A] rounded-xl font-bold border border-[#E3E8E4] hover:bg-gray-200 transition-colors mt-4"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-[#00264A]/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-xl font-bold text-[#00264A]">Edit Team Member</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#00264A]">User Email</label>
                <input 
                  type="email" 
                  disabled
                  value={editingUser.email}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] bg-gray-100 text-gray-500 cursor-not-allowed" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#00264A]">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                  placeholder="e.g. John Doe" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#00264A]">New Password (Optional)</label>
                <input 
                  type="password" 
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] bg-[#F8FAF7]" 
                  placeholder="Leave blank to keep current" 
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-[#E3E8E4] mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 bg-[#F8FAF7] text-[#4A5568] rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#00264A] text-white rounded-lg font-bold hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
