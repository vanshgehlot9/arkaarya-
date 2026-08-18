import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { TrendingUp, Users, Truck, ArrowRight, Activity, DollarSign, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = createAdminClient();
  
  // 1. Fetch total leads
  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: 'exact', head: true });

  // 2. Fetch active pickups
  const { count: pickupsCount } = await supabase
    .from("pickup_requests")
    .select("*", { count: 'exact', head: true })
    .neq("status", "completed")
    .neq("status", "cancelled");

  // 3. Fetch net income
  const { data: transactions } = await supabase
    .from("finance_transactions")
    .select("amount, type");

  // 4. Fetch EPR Inquiries
  const { count: eprCount } = await supabase
    .from("epr_inquiries")
    .select("*", { count: 'exact', head: true });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions?.forEach((t) => {
    if (t.type === 'Income') totalIncome += t.amount;
    if (t.type === 'Expense') totalExpense += t.amount;
  });

  const netIncome = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#00264A]">Dashboard Overview</h1>
        <div className="text-sm text-[#4A5568]">
          Welcome back, Admin
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Pickups Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4] relative overflow-hidden group hover:border-[#629A13] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00264A]/5 flex items-center justify-center text-[#00264A]">
              <Truck size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-[#629A13] bg-[#629A13]/10 px-2.5 py-1 rounded-full">
              <Activity size={14} /> Live
            </span>
          </div>
          <div>
            <p className="text-[#4A5568] font-medium mb-1">Active Pickups</p>
            <h3 className="text-3xl font-bold text-[#00264A]">{pickupsCount || 0}</h3>
          </div>
          <Link href="/admin/pickups" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F8FAF7] p-2 rounded-full text-[#00264A]">
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Total Leads Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4] relative overflow-hidden group hover:border-[#00264A] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <div>
            <p className="text-[#4A5568] font-medium mb-1">Total Leads</p>
            <h3 className="text-3xl font-bold text-[#00264A]">{leadsCount || 0}</h3>
          </div>
          <Link href="/admin/leads" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F8FAF7] p-2 rounded-full text-[#00264A]">
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* EPR Inquiries Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4] relative overflow-hidden group hover:border-purple-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div>
            <p className="text-[#4A5568] font-medium mb-1">EPR Inquiries</p>
            <h3 className="text-3xl font-bold text-[#00264A]">{eprCount || 0}</h3>
          </div>
          <Link href="/admin/epr" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F8FAF7] p-2 rounded-full text-[#00264A]">
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Net Revenue Card */}
        <div className="bg-[#00264A] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#629A13]">
              <DollarSign size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-white bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <TrendingUp size={14} /> YTD
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-1">Net Income</p>
            <h3 className="text-2xl font-bold text-white">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(netIncome)}
            </h3>
          </div>
          <Link href="/admin/finance" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 p-2 rounded-full text-white hover:bg-white/20">
            <ArrowRight size={20} />
          </Link>
        </div>

      </div>

    </div>
  );
}
