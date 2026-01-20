import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Job from "./Job.jsx";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [searchInput, setSearchInput] = useState("");
  const [urlParamValue] = useSearchParams("");
  const [JOB, setJOB] = useState([]);

  useEffect(() => {
    const searchCareer = urlParamValue.get("skill") || "" || searchInput;

    if (searchCareer) {
      // console.log(allJobs());
      setSearchInput(searchCareer);
      const filtered = allJobs?.filter((job) =>
        job?.title.toLowerCase().includes(searchCareer.toLowerCase()),
      );
      setJOB(filtered);
    } else {
      setJOB(allJobs);
    }
  }, [urlParamValue, searchInput, allJobs]);

  return (
    <div className="max-w-6xl  mx-auto my-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type a skill to search jobs..."
          className="w-full px-4 py-2 border rounded-l-full outline-none focus:ring-2 focus:ring-[#bedbff]"
          // className="flex-1 px-4 py-3 border rounded-l-full outline-none focus:ring-2 focus:ring-yellow-300"
        />

        <button
          type="submit"
          className="bg-[#155cf9] hover:bg-[#4f39f6] px-4 flex items-center justify-center rounded-r-full"
        >
          <Search className="h-5 w-5 text-gray-800" />
        </button>
      </form>
      <br />
      <h1 className="font-bold mb-4 text-xl">Search Bar ({JOB.length})</h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                gap-5 md:gap-10
                mx-auto md:mx-0
                w-full max-w-[375px] md:max-w-6xl"
      >
        {JOB.map((value, idx) => (
          <Job key={idx} job={value} />
        ))}
      </div>
    </div>
  );
};
export default Browse;
