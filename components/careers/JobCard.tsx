import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  experience?: string;
  short_description: string;
  overview?: string;
  work_model: string;
  status: string;
  created_at: string;
}

export const JobCard = ({ job }: { job: JobOpening }) => {
  return (
    <Link href={`/careers/${job.slug}`} className="block group">
      <div className="bg-white rounded-3xl p-8 border border-[#E3E8E4] hover:border-[#629A13] hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#629A13]/10 text-[#629A13] rounded-full text-xs font-bold mb-3">
              {job.department}
            </div>
            <h3 className="text-2xl font-bold text-[#00264A] group-hover:text-[#629A13] transition-colors">{job.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#4A5568] bg-[#F8FAF7] px-3 py-1.5 rounded-lg border border-[#E3E8E4]">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#4A5568] bg-[#F8FAF7] px-3 py-1.5 rounded-lg border border-[#E3E8E4]">
              <Clock size={16} /> {job.employment_type}
            </span>
          </div>
        </div>
        
        <p className="text-[#4A5568] mb-6 line-clamp-2">
          {job.short_description}
        </p>

        <div className="flex items-center text-[#00264A] font-bold group-hover:text-[#629A13] transition-colors">
          View Details <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
