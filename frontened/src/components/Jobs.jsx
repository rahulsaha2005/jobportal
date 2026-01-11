import React from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";

export default function Jobs() {
  // Pull jobs from Redux store
  const allJobs = useSelector((state) => state.job.allJobs);

  // Pick 6 random jobs
  const randomJobs = allJobs;
  return (
    <div className="max-w mx-auto mt-5 px-3">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Filter Sidebar */}
        <div className="w-full md:w-[20%]">
          <FilterCard />
        </div>

        {/* Job Cards */}
        {randomJobs.length === 0 ? (
          <span>Job not Found</span>
        ) : (
          <div className="flex-1 md:h-[88vh] overflow-y-auto pb-5 hide-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
              {randomJobs.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
