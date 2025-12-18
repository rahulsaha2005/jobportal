import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";

export default function Signup({setUser}) {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const naviagte = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json", 
        },
        withCredentials: true, 
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      return; 
    }

    if (res.data.success) {
      naviagte("/login");
      console.log(input);
      toast.success(res.data.message);
    }login
    // After successful signup, navigate to login or dashboard
  };
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <div className="flex items-center justify-center w-full md:max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Your Name"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Your Email"
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter Your Phone Number"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
            />
          </div>

          <Label>Profession</Label>
          <div>
            <RadioGroup
              className="flex items-center gap-4 my-5"
              defaultValue="Recruiter"
            >
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
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Profile</Label>

            <Input
              onChange={changeFileHandler}
              accept="image/*"
              type="file"
              className="cursor-pointer"
            />

            {/* Small preview */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="w-16 h-16 object-cover cursor-pointer border rounded"
              />
            )}

            {/* Modal */}
            {open && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                onClick={() => setOpen(false)}
              >
                <img
                  src={preview}
                  alt="full"
                  className="max-w-[90%] max-h-[90%]"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full my-4 bg-[#4f39f6]">
            Submit
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" replace className="text-red-600 text-sm">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
