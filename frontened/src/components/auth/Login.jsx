import React, { useState } from "react";
import { Navbar } from "../shared/navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    // Handle login logic here
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              id="email"
              onChange={changeEventHandler}
              placeholder="Enter Your Email"
            />
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              id="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
            />
          </div>

          <Label className="mt-4">Profession</Label>
          <div className="flex items-center gap-6 my-3">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="student">Student</Label>
            </div>
          </div>

          <Button type="submit" className="w-full my-4 bg-[#4f39f6]">
            Submit
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/signup" replace className="text-red-600 text-sm">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
