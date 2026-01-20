import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const [InputStudentSkill, setInputStudentSkill] = useState("");

  const RedirectingToBrowsepage = () => {
    if (InputStudentSkill) {
      const params = new URLSearchParams();
      params.append("skill", InputStudentSkill);

      const url = params.toString()
        ? `http://localhost:5173/Browse?${params.toString()}`
        : `http://localhost:5173/Browse`;
      navigate(url);
    }
  };
  console.log(InputStudentSkill);
  return (
    <div className="mt-5 text-center">
      <div className="relative z-10 flex flex-col gap-6 max-w-3xl mx-auto">
        {/* Tagline badge */}
        <span className="mx-auto px-5 py-2 rounded-full text-[12px] md:text-base bg-white text-purple-600 font-semibold shadow-lg">
          🚀 Empowering Millions to Find Their Dream Jobs 🚀
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-snug">
          Discover Opportunities.
          <br />
          Build Your <span className="text-yellow-300">Dream Career</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-200">
          Connecting your skills with the right opportunities — quickly and
          effortlessly.
        </p>

        {/* Search bar */}
        <div className="flex w-full max-w-md mx-auto shadow-lg rounded-full overflow-hidden border border-white bg-white animate-fade-in">
          <Input
            type="text"
            value={InputStudentSkill}
            onChange={(e) => setInputStudentSkill(e.target.value)}
            placeholder="Find Your Dream Jobs"
            className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none border-none transition-all duration-300 focus:ring-2 focus:ring-yellow-300"
          />
          <Button
            className="bg-yellow-300 hover:bg-yellow-400 transition-colors px-6 flex items-center justify-center rounded-r-full"
            onClick={(e) => {
              e.preventDefault();
              RedirectingToBrowsepage();
            }}
          >
            <Search className="h-5 w-5 text-gray-800" />
          </Button>
        </div>
      </div>
    </div>
  );
}
