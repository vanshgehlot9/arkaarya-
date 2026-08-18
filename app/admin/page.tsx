import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { TrendingUp, Users, Truck, ArrowRight, Activity, DollarSign, ShieldCheck, Plus } from "lucide-react";
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

  // 5. Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // 6. Fetch recent pickups
  const { data: recentPickups } = await supabase
    .from("pickup_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Pickups */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-lg font-bold text-[#00264A]">Recent Pickups</h2>
              <Link href="/admin/pickups" className="text-sm font-semibold text-[#629A13] hover:text-[#528210]">View All</Link>
            </div>
            <div className="divide-y divide-[#E3E8E4]">
              {recentPickups && recentPickups.length > 0 ? recentPickups.map((pickup: any) => (
                <div key={pickup.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-[#F8FAF7]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00264A]/5 flex items-center justify-center text-[#00264A] shrink-0">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#00264A]">{pickup.company_name}</h4>
                      <p className="text-xs text-[#5E6672]">{pickup.contact_person} • {new Date(pickup.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                    pickup.status === 'completed' ? 'bg-green-100 text-green-700' :
                    pickup.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {pickup.status}
                  </span>
                </div>
              )) : (
                <div className="p-8 text-center text-[#5E6672] text-sm">No recent pickups found.</div>
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#E3E8E4]">
              <h2 className="text-lg font-bold text-[#00264A]">Recent Leads</h2>
              <Link href="/admin/leads" className="text-sm font-semibold text-[#629A13] hover:text-[#528210]">View All</Link>
            </div>
            <div className="divide-y divide-[#E3E8E4]">
              {recentLeads && recentLeads.length > 0 ? recentLeads.map((lead: any) => (
                <div key={lead.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-[#F8FAF7]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#00264A] capitalize">{lead.full_name || lead.name || (lead.email ? lead.email.split('@')[0] : "Unknown")}</h4>
                      <p className="text-xs text-[#5E6672]">{lead.company_name || 'Individual'} • {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                    lead.status === 'contacted' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              )) : (
                <div className="p-8 text-center text-[#5E6672] text-sm">No recent leads found.</div>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar Area: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6">
            <h2 className="text-lg font-bold text-[#00264A] mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link href="/admin/case-studies" className="flex items-center gap-3 p-3 rounded-xl border border-[#E3E8E4] hover:border-[#629A13] hover:bg-[#F8FAF7] transition-all group">
                <div className="w-8 h-8 rounded-lg bg-[#629A13]/10 text-[#629A13] flex items-center justify-center shrink-0">
                  <Plus size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#00264A] group-hover:text-[#629A13] transition-colors">Add Case Study</h4>
                  <p className="text-[10px] text-[#5E6672]">Publish a new success story</p>
                </div>
              </Link>

              <Link href="/admin/legal" className="flex items-center gap-3 p-3 rounded-xl border border-[#E3E8E4] hover:border-[#00264A] hover:bg-[#F8FAF7] transition-all group">
                <div className="w-8 h-8 rounded-lg bg-[#00264A]/10 text-[#00264A] flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#00264A]">Review Policies</h4>
                  <p className="text-[10px] text-[#5E6672]">Manage Legal & Compliance docs</p>
                </div>
              </Link>

              <Link href="/admin/industries" className="flex items-center gap-3 p-3 rounded-xl border border-[#E3E8E4] hover:border-[#00264A] hover:bg-[#F8FAF7] transition-all group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Activity size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#00264A]">Update Industries</h4>
                  <p className="text-[10px] text-[#5E6672]">Manage sectors served</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#F8FAF7] rounded-2xl shadow-sm border border-[#E3E8E4] p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E3E8E4] flex items-center justify-center mx-auto mb-3 text-[#629A13]">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-[#00264A] text-sm">System Status: All Good</h3>
            <p className="text-xs text-[#5E6672] mt-1">Database and APIs are connected and running smoothly.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
