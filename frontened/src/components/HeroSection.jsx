import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="relative text-center bg-linear-to-r from-purple-600 to-blue-500 text-white py-20 px-4 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

      <div className="relative z-10 flex flex-col gap-6 max-w-3xl mx-auto">
        {/* Tagline badge */}
        <span className="mx-auto px-5 py-2 rounded-full text-sm md:text-base bg-white text-purple-600 font-semibold shadow-lg">
          🚀 Empowering Millions to Find Their Dream Jobs 🚀
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-snug">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-yellow-300">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-200">
          Where your career aspirations turn into reality — fast, simple, and reliable.
        </p>

        {/* Search bar */}
        <div className="flex w-full max-w-md mx-auto shadow-lg rounded-full overflow-hidden border border-white bg-white animate-fade-in">
          <Input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none border-none transition-all duration-300 focus:ring-2 focus:ring-yellow-300"
          />
          <Button className="bg-yellow-300 hover:bg-yellow-400 transition-colors px-6 flex items-center justify-center rounded-r-full">
            <Search className="h-5 w-5 text-gray-800" />
          </Button>
        </div>
      </div>
    </div>
  );
}
