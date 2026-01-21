import React from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5">
        <form className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter Company to Search Here..."
            className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4f39f6] focus:border-[#4f39f6] placeholder-gray-400"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-white border border-l-0 rounded-r-full hover:bg-[#4f39f6] transition-colors duration-200"
          >
            <Search
              size={28}
              className="text-gray-500 hover:text-white transition-colors duration-200"
            />
          </button>
        </form>

        <Button
          className="w-full md:w-auto bg-[#4f39f6] hover:bg-[#3623d6] text-white transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/register/company");
          }}
        >
          <p className="flex items-center gap-2 justify-center">
            <span className="text-xl">+</span> Register Company
          </p>
        </Button>
      </div>
    </div>
  );
}
