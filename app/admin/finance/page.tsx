import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { AddTransactionModal } from "./AddTransactionModal";
import FinanceClient from "./FinanceClient";

export const revalidate = 0;

export default async function FinancePage() {
  const supabase = createAdminClient();
  
  const { data: transactions, error } = await supabase
    .from("finance_transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Financial Dashboard</h1>
          <p className="text-[#4A5568] text-sm mt-1">Track revenue, expenses, and overall financial health.</p>
        </div>
        <div className="flex gap-3">
          <AddTransactionModal />
        </div>
      </div>
      <FinanceClient initialData={transactions || []} />
    </div>
  );
}

