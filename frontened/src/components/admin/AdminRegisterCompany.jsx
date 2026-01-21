import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button.jsx";
import { COMPANY_API_END_POINT } from "../../utils/constant.js";
import { toast } from "../ui/sonner.jsx";

export default function RegisterCompany() {
  const [CompanyRegisterData, setCompanyRegisterData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
    industry: "",
    city: "",
    state: "",
    country: "",
    cin: "",
    linkedin: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setCompanyRegisterData({ ...CompanyRegisterData, file: files[0] });
    } else {
      setCompanyRegisterData({ ...CompanyRegisterData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in CompanyRegisterData) {
        if (CompanyRegisterData[key] !== null) {
          console.log(key, CompanyRegisterData);
          formData.append(key, CompanyRegisterData[key]);
        }
      }
      //   console.log(formData);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        console.log("Company Registered:", res.data);
        toast("Company Registered Successfully!");
        setCompanyRegisterData({
          name: "",
          website: "",
          email: "",
          phone: "",
          industry: "",
          city: "",
          state: "",
          country: "",
          cin: "",
          linkedin: "",
          description: "",
          file: null,
        });
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast("Failed to register company. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Register Your Company
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={CompanyRegisterData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            required
          />
          <input
            type="url"
            name="website"
            placeholder="Website URL"
            value={CompanyRegisterData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={CompanyRegisterData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={CompanyRegisterData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry / Sector"
            value={CompanyRegisterData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={CompanyRegisterData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            name="state"
            placeholder="State / Region"
            value={CompanyRegisterData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={CompanyRegisterData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            type="text"
            name="cin"
            placeholder="Company Registration Number (CIN/GST)"
            value={CompanyRegisterData.cin}
            onChange={handleChange}
            className="w-full col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={CompanyRegisterData.linkedin}
            onChange={handleChange}
            className="w-full col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Company Logo
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:cursor-pointer file:border-0 file:bg-blue-100 file:text-blue-700 file:px-4 file:py-2 file:rounded-lg"
            />
            {CompanyRegisterData.file && (
              <p className="mt-2 text-sm text-gray-500">
                {CompanyRegisterData.file.name}
              </p>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Description / About"
            value={CompanyRegisterData.description}
            onChange={handleChange}
            className="w-full col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            rows={4}
          />

          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-start">
            <Button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Register Company
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
