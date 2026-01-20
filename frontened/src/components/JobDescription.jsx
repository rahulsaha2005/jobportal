import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setAllJobs, setSingleJob } from "../redux/jobSlice.js";

export default function JobDescription() {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          const job = response.data.job;
          dispatch(setSingleJob(job));

          if (job.applications?.some((app) => app.applicant === user?._id)) {
            setIsApplied(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("Failed to fetch job details");
      }
    };

    fetchJob();
  }, [id, dispatch, user?._id]);

  function daysAgo(dateString) {
    if (!dateString) return 0;
    const pastDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - pastDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  const applyJobHandler = async () => {
    if (user === null || user === undefined) {
      toast("Login First Then Apply");
      navigate("/login");
      return;
    }

    if (isApplied || isApplying) return;

    try {
      setIsApplying(true);

      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        setIsApplied(true);
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/get`, {
            withCredentials: true,
          });
          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
          }
        } catch (error) {
          console.log(error);
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsApplying(false);
    }
  };

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center pt-10">
      <div className="bg-white max-w-5xl w-full mx-auto my-6 rounded-3xl shadow-lg p-6 sm:p-8 transition-transform hover:scale-[1.01]">
        {/* Header: Company Info + Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="font-semibold text-xl text-gray-900">
              {singleJob?.company?.name || "XYZ"}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <HiLocationMarker /> {singleJob?.location || "India"}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap">
            <Badge
              className="bg-blue-100 text-blue-800 font-semibold"
              variant="ghost"
            >
              {singleJob?.position || "?"}
            </Badge>
            <Badge
              className="bg-red-100 text-red-600 font-semibold"
              variant="ghost"
            >
              {singleJob?.jobType || "?"}
            </Badge>
            <Badge
              className="bg-purple-100 text-purple-700 font-semibold"
              variant="ghost"
            >
              {singleJob?.salary ? singleJob.salary + " lpa" : "?"}
            </Badge>
          </div>
        </div>

        {/* Job Title & Description */}
        <div className="mb-4">
          <h2 className="font-bold text-2xl text-gray-800 mb-2">
            {singleJob?.title || "?"}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {singleJob?.description || "?"}
          </p>
        </div>

        {/* Job Stats */}
        <div className="flex flex-wrap gap-6 mt-4 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Salary:</span>
            <span>{singleJob?.salary ? singleJob.salary + " lpa" : "?"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Applicants:</span>
            <span>{singleJob?.applications?.length || 0} Applied</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCalendar />
            <span>
              Posted: {daysAgo(singleJob?.createdAt)} day
              {daysAgo(singleJob?.createdAt) !== 1 ? "s" : ""} ago
            </span>
          </div>
        </div>

        {/* Required Skills */}
        {singleJob?.requirements?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Required Skills:
            </h3>
            <div className="flex flex-wrap gap-3">
              {singleJob.requirements.map((skill, index) => (
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

        {/* Apply Button */}
        <Button
          onClick={applyJobHandler}
          disabled={isApplied || isApplying}
          className={`mt-6 w-full py-3 text-white text-lg font-semibold rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplying && user
            ? "Applying..."
            : user
              ? isApplied
                ? "Already Applied"
                : "Apply Now"
              : "Apply Now"}
        </Button>
      </div>
    </div>
  );
}
