import React from "react";
import { Badge, badgeVariants } from "./ui/badge.jsx";

export default function LatestJobCards() {
  return (
    <div className="cursor-pointer shadow-2xl border-5 border-gray-200 bg-blue-50 text-blue-900 p-5 rounded-md">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Nostrum dolore quisquam
          autem minima voluptatem nobis commodi asperiores, doloremque ducimus
          itaque tempore officia harum illo esse ea corrupti rem, velit cum?
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className="bg-white text-blue-700  font-semibold  mr-1"
          variant="ghost"
        >
          12 Positions
        </Badge>
        <Badge
          className="bg-white text-[#F83002] font-semibold mr-1"
          variant="ghost"
        >
          Part Time
        </Badge>
        <Badge
          className="bg-white text-[#7209b7]  font-semibold mr-1 "
          variant="ghost"
        >
          24 lpa
        </Badge>
      </div>
    </div>
  );
}
