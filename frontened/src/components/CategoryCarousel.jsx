import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryCarousel() {
  const categories = [
    "Full Stack",
    "AI",
    "Data Science",
    "UI/UX",
    "DevOps",
    "Blockchain",
    "Cybersecurity",
    "Cloud Computing",
    "Mobile Development",
    "Product Management",
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-10 p-5">
      <Carousel className="w-full">
        <CarouselContent className="px-12"> 
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
            >
              <Button
                variant="outline"
                className="rounded-full w-full text-[12px] lg:text-[14px] font-bold bg-black-200"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 z-10 ml-1">
          <ChevronLeft size={24} />
        </CarouselPrevious>

        {/* Next Button */}
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 z-10 mr-1">
          <ChevronRight size={24} />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
