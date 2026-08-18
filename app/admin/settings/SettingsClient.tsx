"use client";

import React, { useState } from "react";
import { Wrench, Users, Shield, Save, Loader2, Mail, Key } from "lucide-react";
import { toggleMaintenanceMode, inviteAdminUser, changeAdminPassword } from "./actions";

export default function SettingsClient({ initialMaintenanceMode }: { initialMaintenanceMode: boolean }) {
  const [activeTab, setActiveTab] = useState("general");
  const [maintenanceMode, setMaintenanceMode] = useState(initialMaintenanceMode);
  const [isToggling, setIsToggling] = useState(false);
  
  // Team State
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState("");
  const [inviteError, setInviteError] = useState("");

  // Security State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleMaintenanceToggle = async () => {
    setIsToggling(true);
    const res = await toggleMaintenanceMode(maintenanceMode);
    if (res.success) {
      setMaintenanceMode(!maintenanceMode);
    } else {
      alert("Failed to toggle maintenance mode.");
    }
    setIsToggling(false);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    setInviteError("");
    setInviteSuccess("");
    
    const res = await inviteAdminUser(inviteEmail);
    if (res.success) {
      setInviteSuccess(`Invite sent to ${inviteEmail}`);
      setInviteEmail("");
    } else {
      setInviteError(res.error || "Failed to invite user");
    }
    setIsInviting(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");

    if (password !== confirmPassword) {
      setPwdError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setPwdError("Password must be at least 6 characters");
      return;
    }

    setIsChangingPwd(true);
    const res = await changeAdminPassword(password);
    if (res.success) {
      setPwdSuccess("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } else {
      setPwdError(res.error || "Failed to update password");
    }
    setIsChangingPwd(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden min-h-[600px] flex flex-col sm:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full sm:w-64 bg-[#F8FAF7] border-r border-[#E3E8E4] p-4 flex flex-col gap-2 shrink-0">
        <button 
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'general' ? 'bg-[#00264A] text-white' : 'text-[#4A5568] hover:bg-white hover:text-[#00264A]'}`}
        >
          <Wrench size={18} />
          General Site Settings
        </button>
        <button 
          onClick={() => setActiveTab("team")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'team' ? 'bg-[#00264A] text-white' : 'text-[#4A5568] hover:bg-white hover:text-[#00264A]'}`}
        >
          <Users size={18} />
          Team Management
        </button>
        <button 
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'security' ? 'bg-[#00264A] text-white' : 'text-[#4A5568] hover:bg-white hover:text-[#00264A]'}`}
        >
          <Shield size={18} />
          Security Options
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-10">
        
        {/* GENERAL SETTINGS */}
        {activeTab === "general" && (
          <div className="max-w-2xl animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-[#00264A] mb-2">General Settings</h2>
            <p className="text-[#4A5568] text-sm mb-8">Manage your public site state and global configurations.</p>
            
            <div className="bg-white border border-[#E3E8E4] rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-bold text-[#00264A] flex items-center gap-2">
                    Maintenance Mode
                    {maintenanceMode && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Active</span>}
                  </h3>
                  <p className="text-sm text-[#4A5568] mt-2 leading-relaxed">
                    When enabled, the public-facing website will display a "We'll be right back" maintenance page. The admin panel will remain accessible to you.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button 
                    onClick={handleMaintenanceToggle}
                    disabled={isToggling}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#629A13] focus:ring-offset-2 ${maintenanceMode ? 'bg-[#629A13]' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-8' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEAM MANAGEMENT */}
        {activeTab === "team" && (
          <div className="max-w-2xl animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-[#00264A] mb-2">Team Management</h2>
            <p className="text-[#4A5568] text-sm mb-8">Invite new administrators to access the dashboard.</p>
            
            <div className="bg-white border border-[#E3E8E4] rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#00264A] mb-4">Invite Administrator</h3>
              
              <form onSubmit={handleInvite} className="space-y-4">
                {inviteSuccess && (
                  <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium">
                    {inviteSuccess}
                  </div>
                )}
                {inviteError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
                    {inviteError}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@arkaarya.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isInviting || !inviteEmail}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#00264A] text-white rounded-xl font-semibold text-sm hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isInviting ? <Loader2 size={16} className="animate-spin" /> : <Users size={16} />}
                  Send Invite Link
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <div className="max-w-2xl animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-[#00264A] mb-2">Security Options</h2>
            <p className="text-[#4A5568] text-sm mb-8">Update your password to keep your account secure.</p>
            
            <div className="bg-white border border-[#E3E8E4] rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#00264A] mb-4">Change Password</h3>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                {pwdSuccess && (
                  <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium">
                    {pwdSuccess}
                  </div>
                )}
                {pwdError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
                    {pwdError}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">New Password</label>
                  <div className="relative">
                    <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#00264A] mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isChangingPwd || !password || !confirmPassword}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#00264A] text-white rounded-xl font-semibold text-sm hover:bg-[#001A33] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isChangingPwd ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
