import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setAuthUser } from "../../redux/authSlice"; // <-- make sure this is correct
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student", // default role
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInput({ ...input, file });
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // navigate after success
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="relative bg-linear-to-r from-purple-600 to-blue-500 min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

      <form
        onSubmit={submitHandler}
        className="bg-white m-4 text-black w-full max-w-md md:max-w-lg border border-gray-200 rounded-md p-6 z-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Enter Your Name"
          />
        </div>

        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter Your Email"
          />
        </div>

        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Enter Your Phone Number"
          />
        </div>

        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter Your Password"
          />
        </div>

        <Label>Profession</Label>
        <RadioGroup
          className="flex items-center gap-4 my-5"
          defaultValue={input.role}
        >
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              id="recruiter"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
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
            />
            <Label htmlFor="student">Student</Label>
          </div>
        </RadioGroup>

        <div className="flex flex-col gap-2">
          <Label>Profile</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
            className="cursor-pointer"
          />

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
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" replace className="text-red-600 text-sm">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
