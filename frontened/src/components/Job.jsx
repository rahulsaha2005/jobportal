import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Job({ job }) {
  if (!job) return null; // safe check
   function daysAgo(dateString) {
    const pastDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - pastDate; // in milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  // console.log(job?);


  return (
    <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 shadow-blue-500/30 bg-blue-200 border-2 border-blue-600">
      {/* Top bar: date & bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)+" days ago " || "2 days ago"}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage src={job.company?.logo || ""} />
          <AvatarFallback>{job.company?.name?.[0] || "X"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{job.company?.name || "XYZ"}</h1>
          <p className="text-sm text-gray-500">{job.location || "Unknown"}</p>
        </div>
      </div>

      {/* Job title & description */}
      <div>
        <h1 className="font-bold text-lg my-2">
          {job.title || "Untitled Job"}
        </h1>
        <div className="text-sm text-gray-600 h-20 overflow-y-auto">
          {job.description || "No description available."}
        </div>
      </div>

      {/* Position, Job Type, Salary badges */}
      <div className="md:flex flex-col md:flex-row md:items-center gap-2 mt-4 flex-wrap">
        <Badge
          className="bg-white text-blue-700 font-semibold mr-1"
          variant="ghost"
        >
          {job.position || "N/A"} Positions
        </Badge>
        <Badge
          className="bg-white text-[#F83002] font-semibold mr-1"
          variant="ghost"
        >
          {job.jobType || "N/A"}
        </Badge>
        <Badge
          className="bg-white text-[#7209b7] font-semibold mr-1"
          variant="ghost"
        >
          {job.salary + " lpa" || "0"}
        </Badge>
      </div>

      {/* Skills badges */}
      {job?.requirements?.length > 0 && (
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <p className="text-gray-600 font-medium">Skills required :</p>

          {/* Show first 2 skills */}
          {job.requirements.slice(0, 1).map((skill, index) => (
            <Badge
              key={index}
              variant="ghost"
              className="bg-white text-green-700 font-semibold"
            >
              {skill}
            </Badge>
          ))}

          {/* If more than 2 skills, show +N */}
          {job.requirements.length > 1 && (
            <Badge
              variant="ghost"
              className="bg-blue-600 text-white font-semibold rounded-full px-2"
            >
              +{job.requirements.length - 1}
            </Badge>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="border bg-red-600 text-white rounded-lg px-4 py-2 shadow-md
               hover:bg-blue-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400
               transition-colors duration-200 ease-in-out"
        >
          <Link to={`/description/${job._id}`}>Details</Link>
        </Button>

        <Button
          className="border bg-purple-600 text-white rounded-lg px-4 py-2 shadow-md
               hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-400
               transition-colors duration-200 ease-in-out"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
}
