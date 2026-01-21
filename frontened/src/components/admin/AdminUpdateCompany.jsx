import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button.jsx";
import { COMPANY_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import AdminRegisteredCompany from "../hooks/AdminRegisteredCompany.jsx";
import { useParams, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { IdCardLanyardIcon } from "lucide-react";

export default function AdminUpdateCompany() {
  const [searchParams] = useSearchParams();
  const [id, setId] = useState("");

  useEffect(() => {
    const paramId = searchParams.get("id");
    if (paramId) setId(paramId);
  }, [searchParams]);

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
  const { registerCompanyData } = useSelector((store) => store.company);
  useEffect(() => {
    if (registerCompanyData?.length && id) {
      const company = registerCompanyData.find((c) => c._id === id);

      if (company) {
        setCompanyRegisterData({
          name: company.name || "",
          website: company.website || "",
          email: company.email || "",
          phone: company.phone || "",
          industry: company.industry || "",
          city: company.city || "",
          state: company.state || "",
          country: company.country || "",
          cin: company.cin || "",
          linkedin: company.linkedin || "",
          description: company.description || "",
          file: null,
        });
      }
    }
  }, [id, registerCompanyData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setCompanyRegisterData((prev) => ({
      ...prev,
      [name]: name === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in CompanyRegisterData) {
        if (CompanyRegisterData[key] !== null) {
          formData.append(key, CompanyRegisterData[key]);
        }
      }
      console.log(id);
      console.log(`{COMPANY_API_END_POINT}/update/${id}`);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast("Company Updated Successfully 🎉");
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
      console.error(error);
      toast("Failed to update company ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Update Your Company
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            value={CompanyRegisterData.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="input"
          />
          <input
            name="website"
            value={CompanyRegisterData.website}
            onChange={handleChange}
            placeholder="Website"
            className="input"
          />
          <input
            name="email"
            value={CompanyRegisterData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <input
            name="phone"
            value={CompanyRegisterData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input"
          />
          <input
            name="industry"
            value={CompanyRegisterData.industry}
            onChange={handleChange}
            placeholder="Industry"
            className="input"
          />
          <input
            name="city"
            value={CompanyRegisterData.city}
            onChange={handleChange}
            placeholder="City"
            className="input"
          />
          <input
            name="state"
            value={CompanyRegisterData.state}
            onChange={handleChange}
            placeholder="State"
            className="input"
          />
          <input
            name="country"
            value={CompanyRegisterData.country}
            onChange={handleChange}
            placeholder="Country"
            className="input"
          />

          <input
            name="cin"
            value={CompanyRegisterData.cin}
            onChange={handleChange}
            placeholder="CIN / GST"
            className="input col-span-2"
          />

          <input
            name="linkedin"
            value={CompanyRegisterData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
            className="input col-span-2"
          />

          <textarea
            name="description"
            value={CompanyRegisterData.description}
            onChange={handleChange}
            placeholder="Company Description"
            rows={4}
            className="input col-span-2"
          />

          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className="col-span-2"
          />

          <Button type="submit" className="col-span-2 bg-blue-600">
            Update Company 🚀
          </Button>
        </form>
      </div>
    </div>
  );
}
