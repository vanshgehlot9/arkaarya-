const fs = require('fs');
let content = fs.readFileSync('app/admin/team/TeamClient.tsx', 'utf8');

content = content.replace(
  'import { UserPlus, ShieldAlert, CheckCircle2, Trash2, Mail, Link as LinkIcon, Loader2 } from "lucide-react";',
  'import { UserPlus, ShieldAlert, CheckCircle2, Trash2, Mail, Link as LinkIcon, Loader2, Edit2, X } from "lucide-react";'
);

content = content.replace(
  'import { inviteTeamMember, deleteTeamMember, toggleTeamMemberStatus, createTeamMember } from "./actions";',
  'import { inviteTeamMember, deleteTeamMember, toggleTeamMemberStatus, createTeamMember, updateTeamMember } from "./actions";'
);

content = content.replace(
  'const [inviteEmail, setInviteEmail] = useState("");',
  'const [inviteEmail, setInviteEmail] = useState("");\n  const [inviteName, setInviteName] = useState("");\n  const [showEditModal, setShowEditModal] = useState(false);\n  const [editingUser, setEditingUser] = useState<any>(null);\n  const [editName, setEditName] = useState("");\n  const [editPassword, setEditPassword] = useState("");'
);

content = content.replace(
  'const res = await inviteTeamMember(inviteEmail);',
  'const res = await inviteTeamMember(inviteEmail, inviteName);'
);

content = content.replace(
  'email: inviteEmail,',
  'email: inviteEmail,\n          name: inviteName,'
);

content = content.replace(
  'email: inviteEmail,',
  'email: inviteEmail,\n          name: inviteName,'
);

content = content.replace(
  'const res = await createTeamMember(inviteEmail, createPassword);',
  'const res = await createTeamMember(inviteEmail, createPassword, inviteName);'
);

content = content.replace(
  'const copyLink = () => {',
  `const handleEditSubmit = async (e: React.FormEvent) => {
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

  const copyLink = () => {`
);

content = content.replace(
  'onClick={() => { setShowInviteModal(true); setInviteResult(null); setInviteEmail(""); }}',
  'onClick={() => { setShowInviteModal(true); setInviteResult(null); setInviteEmail(""); setInviteName(""); }}'
);

content = content.replace(
  '<th className="px-6 py-4 font-semibold">User Email</th>',
  '<th className="px-6 py-4 font-semibold">User Email</th>\n                <th className="px-6 py-4 font-semibold">Name</th>'
);

content = content.replace(
  `                    <td className="px-6 py-4 font-medium text-[#00264A] flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00264A]/10 flex items-center justify-center text-[#00264A] font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      {user.email}
                    </td>`,
  `                    <td className="px-6 py-4 font-medium text-[#00264A] flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00264A]/10 flex items-center justify-center text-[#00264A] font-bold">
                        {user.name?.[0]?.toUpperCase() || user.email?.[0].toUpperCase()}
                      </div>
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">{user.name || "-"}</td>`
);

content = content.replace(
  `                      <button 
                        onClick={() => handleToggleBlock(user.id, user.is_banned)}`,
  `                      <button 
                        onClick={() => openEditModal(user)}
                        className="px-3 py-1.5 bg-gray-50 text-[#5E6672] hover:bg-gray-200 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => handleToggleBlock(user.id, user.is_banned)}`
);

content = content.replace(
  `                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#00264A]">Email Address</label>`,
  `                  <div className="space-y-1">
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
                    <label className="text-sm font-semibold text-[#00264A]">Email Address</label>`
);

content += `
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
`;

content = content.replace('      )}\n    </div>', '      )}\n    </div>');

fs.writeFileSync('app/admin/team/TeamClient.tsx', content);
