import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Up", "hyderbad", "pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "AI",
      "UI",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];
export default function FilterCard() {
  return (
    <div className="w-full bg-white p-1 rounded-b-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 border border-gray-200" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              return (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    className="border border-neutral-950"
                    value={item}
                  />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
