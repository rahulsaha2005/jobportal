import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge, badgeVariants } from "./ui/badge.jsx";
import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Job() {
  return (
    <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 shadow-blue-500/30 bg-blue-200 border-2 border-blue-600 ">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 y-2">
        <Button>
          <Avatar>
            <AvatarImage src="data:image/jpeg;base64,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" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
          perspiciatis nulla soluta aut laboriosam minima.
        </p>
      </div>
      <div className="md:flex flex-col md:flex-row md:items-center gap-2 mt-4">
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
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="Outline"
          className="border bg-red-600 text-white rounded-lg px-4 py-2 shadow-md
               hover:bg-blue-700
               active:bg-red-800
               focus:outline-none focus:ring-2 focus:ring-red-400
               transition-colors duration-200 ease-in-out"
        >
          <Link to="/description/:id">Details</Link>
        </Button>
        <Button
          className="border bg-purple-600 text-white rounded-lg px-4 py-2 shadow-md 
               hover:bg-blue-700 
               active:bg-blue-800 
               focus:outline-none focus:ring-2 focus:ring-purple-400 
               transition-colors duration-200 ease-in-out"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
}
