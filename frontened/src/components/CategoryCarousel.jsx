import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";

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
    <div>
      <Carousel className="w-full max-w-4xl mx-auto  my-10">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className=" md:basis-1/2  lg:basis-1/3 ">
              <Button className="w-full text-1xl font-semibold">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
}

