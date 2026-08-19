"use client";

import React, { useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, Search, Filter, Trash2 } from "lucide-react";
import { deleteTransaction } from "./actions";

export default function FinanceClient({ initialData }: { initialData: any[] }) {
  const [transactions, setTransactions] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (tx.description && tx.description.toLowerCase().includes(query)) ||
                          (tx.category && tx.category.toLowerCase().includes(query));
    const matchesType = filterType === "All" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  // Calculate totals from current state
  let totalIncome = 0;
  let totalExpense = 0;

  filteredTransactions.forEach((t) => {
    if (t.type === 'Income') totalIncome += t.amount;
    if (t.type === 'Expense') totalExpense += t.amount;
  });

  const netIncome = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    const res = await deleteTransaction(id);
    if (res.success) {
      setTransactions(transactions.filter(t => t.id !== id));
    } else {
      alert("Error deleting transaction");
    }
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Date", "Type", "Category", "Description", "Invoice No", "Amount (INR)"];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map(tx => {
        const date = new Date(tx.transaction_date || tx.created_at).toISOString().split('T')[0];
        // Wrap strings in quotes to handle commas
        return `"${date}","${tx.type}","${tx.category}","${tx.description.replace(/"/g, '""')}","${tx.invoice_number || ""}","${tx.amount}"`;
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `finance_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <ArrowUpRight size={20} />
            </div>
            <h3 className="font-semibold text-[#4A5568]">Total Income</h3>
          </div>
          <div className="text-3xl font-bold text-[#00264A]">
            {formatCurrency(totalIncome)}
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <ArrowDownRight size={20} />
            </div>
            <h3 className="font-semibold text-[#4A5568]">Total Expenses</h3>
          </div>
          <div className="text-3xl font-bold text-[#00264A]">
            {formatCurrency(totalExpense)}
          </div>
        </div>

        {/* Net Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#629A13]/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#00264A]/5 flex items-center justify-center text-[#00264A]">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-[#4A5568]">Net Income</h3>
          </div>
          <div className="text-3xl font-bold text-[#00264A] relative z-10">
            {formatCurrency(netIncome)}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E3E8E4] flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
          />
        </div>
        <div className="flex gap-3 relative w-full sm:w-auto">
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-colors ${showFilters ? 'bg-[#F8FAF7] border-[#629A13] text-[#629A13]' : 'bg-white border-[#E3E8E4] text-[#00264A] hover:bg-[#F8FAF7]'}`}
            >
              <Filter size={16} />
              Filter
            </button>
            {showFilters && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-[#E3E8E4] shadow-lg rounded-xl p-3 z-20">
                <p className="text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Transaction Type</p>
                <div className="space-y-1">
                  {['All', 'Income', 'Expense'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-[#00264A] p-2 hover:bg-[#F8FAF7] rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="filterType" 
                        value={type} 
                        checked={filterType === type}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="text-[#629A13] focus:ring-[#629A13]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleExportCSV} className="px-4 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33] transition-colors whitespace-nowrap">
            Export Report
          </button>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E3E8E4]">
          <h2 className="font-bold text-[#00264A] text-lg">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-[#4A5568]">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Invoice No</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#4A5568]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <DollarSign size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium">No transactions found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 text-[#4A5568]">
                      {new Date(tx.transaction_date || tx.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#00264A]">{tx.description}</div>
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      {tx.invoice_number ? (
                        <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{tx.invoice_number}</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#4A5568]">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-[#00264A]'}`}>
                        {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(tx.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Transaction"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
