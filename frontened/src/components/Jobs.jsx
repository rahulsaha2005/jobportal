import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Jobs() {
  return (
    <div className="max-w-6xl mx-auto mt-5 px-3 ">
      <div className="flex flex-col md:flex-row gap-5">

        {/* Filter */}
        <div className="w-full md:w-[20%]">
          <FilterCard />
        </div>

        {/* Jobs */}
        {jobsArray.length <= 0 ? (
          <span>Job not Found</span>
        ) : (
          <div className="flex-1 md:h-[88vh] overflow-y-auto pb-5 hide-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
              {jobsArray.map((value, key) => (
                <Job key={key} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
