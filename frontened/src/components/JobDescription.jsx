import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant.js";
import { useParams } from "react-router-dom";
export default function JobDescription() {
  const [applied, setApplied] = useState(false);
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setJobDetail(response.data.job);
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [id]);

  function daysAgo(dateString) {
    const pastDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - pastDate; // in milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const handleApply = () => {
    if (!applied) {
      setApplied(true);
    }
  };
  console.log(jobDetail);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-5xl w-full mx-auto my-6 rounded-3xl shadow-lg p-6 sm:p-8 transition-transform hover:scale-[1.01]">
        {/* Header: Company Info + Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="font-semibold text-xl text-gray-900">
              {jobDetail?.company?.name ? jobDetail.company.name : "XYZ"}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <HiLocationMarker className="inline" />{" "}
              {jobDetail?.location || "India"}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap">
            <Badge
              className="bg-blue-100 text-blue-800 font-semibold"
              variant="ghost"
            >
              {jobDetail?.position || "?"}
            </Badge>
            <Badge
              className="bg-red-100 text-red-600 font-semibold"
              variant="ghost"
            >
              {jobDetail?.jobType || "?"}
            </Badge>
            <Badge
              className="bg-purple-100 text-purple-700 font-semibold"
              variant="ghost"
            >
              {jobDetail?.salary+" lpa" || "?"}
            </Badge>
          </div>
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <h2 className="font-bold text-2xl text-gray-800 mb-2">
            {jobDetail?.title || "?"}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {jobDetail?.description || "?"}
          </p>
        </div>

        {/* Job Stats: Salary, Applicants, Posted Date */}
        <div className="flex flex-wrap gap-6 mt-4 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Salary:</span>
            <span> {jobDetail?.salary+"lpa" || "?"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Applicants:</span>
            <span>120 Applied</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCalendar />
            <span>
              Posted: {daysAgo(jobDetail?.createdAt) || "100000"} day ago
            </span>
          </div>
        </div>
        <div className="mt-6">
          {jobDetail?.requirements?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                Required Skills:
              </h3>
              <div className="flex flex-wrap gap-3">
                {jobDetail.requirements.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-green-200 
                       text-green-800 font-medium shadow-sm hover:scale-105 
                       transition-transform duration-200 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className="mt-6">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors 
                        ${
                          applied
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
          >
            {applied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
