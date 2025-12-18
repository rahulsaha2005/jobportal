import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="text-center ">
      <div className="flex flex-col my-10 gap-5 ">
        <span className=" mx-auto px-4 py-2 rounded-full text-[10px] md:text-[12px]    bg-gray-100 text-[#DC143C] font-medium ">
          🚀 Empowering Millions to Find Their Dream Jobs 🚀
        </span>
        <h1 className=" text-3xl md:text-5xl font-bold ">
          Search , Apply & <br /> Get Your
          <span className="text-[#4f39f6]"> Dream Jobs</span>
        </h1>
        <p>
          Where your career aspirations turn into reality — fast, simple, and
          reliable
        </p>
        <div className="flex w-full max-w-md shadow-lg border border-gray-200 rounded-full items-center  mx-auto">
          <Input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full text-sm md:text-base "
          />
          <Button className="rounded-r-full bg-[#4f39f6]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
