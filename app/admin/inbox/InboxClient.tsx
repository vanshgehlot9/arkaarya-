"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Inbox, MailOpen, Mail, Trash2, Building2, Phone, Search, Loader2 } from "lucide-react";
import { markMessageRead, deleteMessage } from "./actions";

export default function InboxClient({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (msg.company && msg.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectMessage = async (msg: any) => {
    setSelectedMessage(msg);
    if (msg.status === "new") {
      // Optimistic update
      setMessages(messages.map(m => m.id === msg.id ? { ...m, status: "read" } : m));
      await markMessageRead(msg.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setIsDeleting(true);
    await deleteMessage(id);
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
    setIsDeleting(false);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A] flex items-center gap-2">
            <Inbox size={24} className="text-[#629A13]" />
            Enterprise Inbox
          </h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage contact inquiries and enterprise requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden flex flex-1 min-h-0">
        
        {/* Left List Pane */}
        <div className="w-full lg:w-[350px] border-r border-[#E3E8E4] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#E3E8E4] bg-[#F8FAF7]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E3E8E4] text-sm focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-[#E3E8E4]">
            {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
              <button 
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`w-full text-left p-4 hover:bg-[#F8FAF7] transition-colors ${selectedMessage?.id === msg.id ? 'bg-[#F8FAF7] border-l-4 border-l-[#629A13]' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-[#00264A] flex items-center gap-2 truncate pr-2">
                    {msg.status === "new" ? <span className="w-2 h-2 rounded-full bg-[#629A13]" /> : null}
                    <span className="truncate">{msg.name}</span>
                  </div>
                  <span className="text-xs text-[#5E6672] shrink-0">
                    {format(new Date(msg.created_at), "MMM d, HH:mm")}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#5E6672] truncate mb-1">
                  {msg.company || "No Company"}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {msg.message}
                </div>
              </button>
            )) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                No messages found.
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="hidden lg:flex flex-1 flex-col bg-white overflow-y-auto">
          {selectedMessage ? (
            <div className="p-8 max-w-3xl mx-auto w-full">
              
              <div className="flex items-start justify-between pb-6 border-b border-[#E3E8E4] mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#00264A] mb-2">{selectedMessage.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-[#5E6672]">
                    <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-1.5 hover:text-[#629A13]">
                      <Mail size={16} /> {selectedMessage.email}
                    </a>
                    {selectedMessage.company && (
                      <div className="flex items-center gap-1.5">
                        <Building2 size={16} /> {selectedMessage.company}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#5E6672]">
                    {format(new Date(selectedMessage.created_at), "MMM do yyyy, h:mm a")}
                  </span>
                  <button 
                    onClick={() => handleDelete(selectedMessage.id)}
                    disabled={isDeleting}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete Message"
                  >
                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>

              <div className="bg-[#F8FAF7] rounded-xl p-6 border border-[#E3E8E4] text-[#121212] whitespace-pre-wrap leading-relaxed shadow-inner">
                {selectedMessage.message}
              </div>

              <div className="mt-8 flex justify-end">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: Enterprise Inquiry - ArkaArya`}
                  className="px-6 py-2.5 bg-[#00264A] text-white rounded-lg font-semibold text-sm hover:bg-[#001A33] transition-colors"
                >
                  Reply via Email
                </a>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MailOpen size={48} className="text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-[#00264A] mb-2">Select a message</h3>
              <p className="text-gray-500">Choose a message from the list to view its contents.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
