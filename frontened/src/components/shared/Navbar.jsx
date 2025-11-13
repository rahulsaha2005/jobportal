import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";

export const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Sphere</span>
        </h1>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>HOME</li>
            <li>JOBS</li>
            <li>BROWSE</li>
          </ul>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent></PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
