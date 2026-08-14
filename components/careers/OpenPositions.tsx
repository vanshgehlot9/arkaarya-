"use client";

import React, { useState } from "react";
import { JobCard, JobOpening } from "./JobCard";

export const OpenPositions = ({ initialJobs }: { initialJobs: JobOpening[] }) => {
  const [activeTab, setActiveTab] = useState("All");

  const departments = ["All", ...Array.from(new Set(initialJobs.map(job => job.department)))];

  const filteredJobs = activeTab === "All" 
    ? initialJobs 
    : initialJobs.filter(job => job.department === activeTab);

  return (
    <section className="py-24 bg-[#F8FAF7]" id="open-roles">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00264A] mb-6">Open Positions</h2>
          <p className="text-lg text-[#4A5568]">
            Discover where you can make the biggest impact. We're always looking for passionate individuals to join our mission.
          </p>
        </div>

        {initialJobs.length > 0 ? (
          <>
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === dept 
                      ? "bg-[#00264A] text-white shadow-md" 
                      : "bg-white text-[#4A5568] border border-[#E3E8E4] hover:border-[#629A13] hover:text-[#629A13]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#4A5568] text-lg">No open positions in this department right now.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E3E8E4]">
            <p className="text-[#4A5568] text-lg font-medium">There are currently no open positions.</p>
            <p className="text-[#4A5568] mt-2">Please check back later or send us an email at careers@arkaarya.com</p>
          </div>
        )}
      </div>
    </section>
  );
};
