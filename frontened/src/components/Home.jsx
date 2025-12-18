import React from "react";
import { Navbar } from "./shared/navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
export default function Home() {
  // user=true;
  return (
    <>
      <div className="relative text-center bg-linear-to-r from-purple-600 to-blue-500 text-white min-h-screen px-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

        <HeroSection />
        <CategoryCarousel />
        {/* <LatestJobs/> */}
        {/* <Footer/> */}
      </div>
    </>
  );
}
