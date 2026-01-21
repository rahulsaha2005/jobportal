import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompanyData } from "../../redux/companySlice";

export default function AdminCompanyDescription() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Use the correct Redux state key
  const { singleCompanyData } = useSelector((store) => store.company);

  useEffect(() => {
    const paramId = searchParams.get("id");
    if (!paramId) return;

    const getCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${paramId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompanyData(res.data.company));
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    };

    getCompany();
  }, [searchParams, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading company data...
      </div>
    );
  }

  if (!singleCompanyData) {
    return (
      <div className="text-center py-10 text-red-500">
        Company not found!
      </div>
    );
  }

  const { name, description, location, website, email, phone } = singleCompanyData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      {location && (
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {location}
        </p>
      )}

      {website && (
        <p className="text-blue-600 mb-2">
          <strong>Website:</strong>{" "}
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </p>
      )}

      {email && (
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {email}
        </p>
      )}

      {phone && (
        <p className="text-gray-600 mb-4">
          <strong>Phone:</strong> {phone}
        </p>
      )}

      {description && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
}
