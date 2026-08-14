"use client";

import React, { useState } from "react";
import { Briefcase, Search, MapPin, Building, MoreVertical, Trash2 } from "lucide-react";
import { JobStatusToggle } from "./JobStatusToggle";
import { deleteJob } from "./actions";

export default function CareersClient({ initialData }: { initialData: any[] }) {
  const [jobs, setJobs] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(query)) ||
      (job.department && job.department.toLowerCase().includes(query)) ||
      (job.location && job.location.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    const res = await deleteJob(id);
    if (res.success) {
      setJobs(jobs.filter(j => j.id !== id));
    } else {
      alert("Error deleting job");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E3E8E4] flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search roles or departments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E3E8E4] focus:outline-none focus:border-[#629A13] text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3E8E4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAF7] border-b border-[#E3E8E4] text-[#4A5568]">
              <tr>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E4]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#4A5568]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Briefcase size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium">No jobs posted</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#00264A] text-base">{job.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        Posted: {new Date(job.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#4A5568]">
                        <Building size={14} className="text-gray-400" />
                        {job.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#4A5568]">
                        <MapPin size={14} className="text-gray-400" />
                        {job.location} ({job.work_model})
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-[#4A5568] px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                        {job.employment_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {job.status === 'Open' ? (
                        <div className="flex items-center gap-1 text-[#629A13] font-medium bg-[#629A13]/10 px-2 py-1 rounded-full w-fit">
                          <span className="w-2 h-2 rounded-full bg-[#629A13]"></span> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full w-fit">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span> Closed
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <JobStatusToggle id={job.id} currentStatus={job.status} />
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
