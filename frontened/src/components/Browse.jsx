import React from "react";
import { connect, useSelector } from "react-redux";
import Job from "./Job.jsx";
const RandomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
    const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-6xl  mx-auto my-5">
      <h1 className="font-bold mb-4 text-xl">
        Search Bar ({allJobs.length})
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                gap-5 md:gap-10
                mx-auto md:mx-0
                w-full max-w-[375px] md:max-w-6xl"
      >
        {allJobs.map((value, idx) => (
          <Job key={idx} job={value}  />
        ))}
      </div>
    </div>
  );
};
export default Browse;
