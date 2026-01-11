import React from "react";
import { Badge } from "./ui/badge.jsx";

export default function LatestJobCards({ job }) {
  console.log(job);

  return (
    <div className="cursor-pointer shadow-2xl border-5 border-gray-200 bg-blue-50 text-blue-900 p-5 rounded-md">
      {/* Company and Location */}
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name || "XYZ"}</h1>
        <p className="text-sm text-gray-500">{job?.location || "Unknown"}</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">
          {job?.title || "Untitled Job"}
        </h1>
        <p className="text-sm text-gray-600">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Position, Job Type, Salary */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge
          className="bg-white text-blue-700 font-semibold mr-1"
          variant="ghost"
        >
          {job?.position || "N/A"}
        </Badge>
        <Badge
          className="bg-white text-[#F83002] font-semibold mr-1"
          variant="ghost"
        >
          {job?.jobType || "N/A"}
        </Badge>
        <Badge
          className="bg-white text-[#7209b7] font-semibold mr-1"
          variant="ghost"
        >
          {job?.salary + " lpa" || "0"}
        </Badge>
      </div>

      {/* Skills */}
      {job?.requirements?.length > 0 && (
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <p className="text-[red]">Skills required :</p>
          {job.requirements.map((skill, index) => (
            <Badge
              key={index}
              className="bg-white text-green-700 font-semibold"
              variant="ghost"
            >
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
