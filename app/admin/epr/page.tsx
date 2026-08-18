import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { format } from "date-fns";
import { ShieldCheck, Mail, Phone, Building } from "lucide-react";
import { EPRStatusToggle } from "./EPRStatusToggle";

export const revalidate = 0;

export default async function AdminEPRPage() {
  const supabase = createAdminClient();

  const { data: inquiries, error } = await supabase
    .from("epr_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching EPR inquiries:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">EPR Inquiries</h1>
          <p className="text-sm text-[#4A5568]">Manage extended producer responsibility consultation requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-[#E3E8E4]">
                <th className="p-4 text-xs font-semibold text-[#4A5568] uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-[#4A5568] uppercase tracking-wider">Company Details</th>
                <th className="p-4 text-xs font-semibold text-[#4A5568] uppercase tracking-wider">Requirements</th>
                <th className="p-4 text-xs font-semibold text-[#4A5568] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {inquiries && inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 align-top whitespace-nowrap text-sm text-[#4A5568]">
                      {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2 font-semibold text-[#00264A] mb-1">
                        <Building size={16} className="text-[#629A13]" />
                        {inquiry.company_name}
                      </div>
                      <div className="text-sm text-[#4A5568] mb-1">{inquiry.contact_person}</div>
                      <div className="flex items-center gap-1.5 text-xs text-[#718096] mb-1">
                        <Mail size={12} /> {inquiry.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#718096]">
                        <Phone size={12} /> {inquiry.phone}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm font-medium text-[#2D3748] mb-1">
                        Category: <span className="font-normal text-[#4A5568]">{inquiry.ewaste_category}</span>
                      </div>
                      <div className="text-sm font-medium text-[#2D3748] mb-2">
                        Vol: <span className="font-normal text-[#4A5568]">{inquiry.estimated_volume}</span>
                      </div>
                      {inquiry.message && (
                        <div className="text-xs text-[#718096] bg-gray-100 p-2 rounded max-w-xs break-words">
                          {inquiry.message}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <EPRStatusToggle id={inquiry.id} currentStatus={inquiry.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#4A5568]">
                    <ShieldCheck size={32} className="mx-auto text-gray-300 mb-3" />
                    <p>No EPR inquiries found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
