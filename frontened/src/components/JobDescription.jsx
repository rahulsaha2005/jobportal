import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";

export default function JobDescription() {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (!applied) {
      setApplied(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-5xl w-full mx-auto my-6 rounded-3xl shadow-lg p-6 sm:p-8 transition-transform hover:scale-[1.01]">
        {/* Header: Company Info + Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="font-semibold text-xl text-gray-900">
              Company Name
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <HiLocationMarker className="inline" /> India
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap">
            <Badge
              className="bg-blue-100 text-blue-800 font-semibold"
              variant="ghost"
            >
              12 Positions
            </Badge>
            <Badge
              className="bg-red-100 text-red-600 font-semibold"
              variant="ghost"
            >
              Part Time
            </Badge>
            <Badge
              className="bg-purple-100 text-purple-700 font-semibold"
              variant="ghost"
            >
              24 LPA
            </Badge>
          </div>
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <h2 className="font-bold text-2xl text-gray-800 mb-2">
            Frontend Developer
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We are looking for a skilled Frontend Developer to join our dynamic
            team. You will work closely with designers and backend developers to
            create a seamless user experience. Knowledge of React, Tailwind CSS,
            and responsive design is required.
          </p>
        </div>

        {/* Job Stats: Salary, Applicants, Posted Date */}
        <div className="flex flex-wrap gap-6 mt-4 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Salary:</span>
            <span>24 LPA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Applicants:</span>
            <span>120 Applied</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCalendar />
            <span>Posted: 3 days ago</span>
          </div>
        </div>

        {/* Job Description  */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Job Description:
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Develop and maintain web applications using React.js</li>
            <li>Collaborate with designers to implement UI/UX designs</li>
            <li>Optimize applications for maximum speed and scalability</li>
            <li>Participate in code reviews and team meetings</li>
          </ul>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Qualifications:
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>2+ years experience in frontend development</li>
            <li>Strong knowledge of JavaScript, React, and Tailwind CSS</li>
            <li>Good understanding of REST APIs and state management</li>
            <li>Strong problem-solving skills</li>
          </ul>
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
