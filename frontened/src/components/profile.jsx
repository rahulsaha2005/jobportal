import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact2, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Badge } from "./ui/badge";

export default function Profile() {
  const isResume = true;

  return (
    <div className="mx-3 sm:mx-auto max-w-5xl my-4 rounded-2xl border bg-white shadow-sm dark:bg-zinc-900 p-4 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-2 ring-gray-200 dark:ring-zinc-700">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FN</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Full Name
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, obcaecati saepe harum asperiores nulla aspernatur.
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          variant="outline"
          size="icon"
          className="self-center sm:self-start"
        >
          <Pen className="w-4 h-4" />
        </Button>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="my-5 h-px bg-gray-200 dark:bg-zinc-700" />

      {/* ================= DETAILS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="break-all text-gray-700 dark:text-gray-300">
              jived1224@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Contact2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-gray-700 dark:text-gray-300">9923103037</span>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((item, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-3 py-1 text-xs sm:text-sm rounded-md"
              >
                Skill {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-sm font-semibold text-muted-foreground">
            Resume
          </Label>

          {isResume ? (
            <a
              href="https://www.google.com"
              target="_blank"
              className="inline-block text-sm text-blue-600 hover:underline m-2"
            >
              View Resume (PDF)
            </a>
          ) : (
            <span className="text-sm text-gray-500">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
}
