"use client";

import React, { useState } from "react";
import { loginAction } from "./actions";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    // If there is an error, display it. (If successful, the action will redirect, so this won't run)
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-[#E3E8E4]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#00264A]"></div>
            <span className="text-2xl font-bold text-[#00264A]">ArkaArya</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00264A]">Admin Portal</h1>
          <p className="text-[#4A5568] mt-2">Sign in to manage operations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#00264A]">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="admin@arkaarya.com"
              className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all bg-[#F8FAF7]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#00264A]">Password</label>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] outline-none transition-all bg-[#F8FAF7]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[#629A13] focus:ring-[#629A13] w-4 h-4 border-gray-300" />
              <span className="text-sm text-[#4A5568]">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#629A13] hover:underline font-medium">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-[#00264A] text-white rounded-xl font-bold hover:bg-[#001A33] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E3E8E4] text-center">
          <p className="text-xs text-gray-500">
            Secure connection. Internal use only.
          </p>
        </div>
      </div>
    </div>
  );
}
