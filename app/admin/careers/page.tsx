import React from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import { AddJobModal } from "./AddJobModal";
import CareersClient from "./CareersClient";

export const revalidate = 0;

export default async function CareersAdminPage() {
  const supabase = createAdminClient();

  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (jobsError) {
    console.error("Error fetching jobs:", jobsError);
  }

  const { data: applications, error: appsError } = await supabase
    .from("job_applications")
    .select("*, jobs(title)")
    .order("created_at", { ascending: false });

  if (appsError) {
    console.error("Error fetching job applications:", appsError);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00264A]">Careers & Jobs</h1>
          <p className="text-[#4A5568] text-sm mt-1">Manage open positions and career opportunities.</p>
        </div>
        <div className="flex gap-3">
          <AddJobModal />
        </div>
      </div>
      <CareersClient initialData={jobs || []} initialApplications={applications || []} />
    </div>
  );
}

