import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table.jsx";
import { toast } from "sonner";
import AdminRegisteredCompany from "../hooks/AdminRegisteredCompany.jsx";

export default function Companies() {
  const { registerCompanyData } = useSelector((store) => store.company);
  const navigate = useNavigate();
  AdminRegisteredCompany();

  function generateLogo(name = "") {
    const initials = name
      ? name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "?";

    const size = 100;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#feb448";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#fff";
    ctx.font = `${size / 2}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2);

    return canvas.toDataURL();
  }

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

      <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-2xl">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption className="text-left text-gray-500 p-4">
            A list of your Registered Companies
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-3 text-left text-gray-700">
                Logo
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700">
                Name
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700">
                Website
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700">
                Location
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700">
                Actions
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700">
                Info
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {registerCompanyData?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="p-3">
                  <img
                    src={company.logo || generateLogo(company.name)}
                    alt={company.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="p-3">{company.name}</TableCell>
                <TableCell className="p-3 text-blue-600 hover:underline">
                  <a href={company.website} target="_blank" rel="noreferrer">
                    {company.website}
                  </a>
                </TableCell>
                <TableCell className="p-3">{company.location}</TableCell>
                <TableCell className="p-3 flex gap-2">
                  <Button
                    className="bg-[#4f39f6] hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/admin/update/company?id=${company._id}`);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell
                  className="p-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/company/info?id=${company._id}`);
                  }}
                >
                  ...
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
