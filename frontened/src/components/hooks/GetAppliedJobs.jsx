import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setGetAppliedJobs } from "../../redux/jobSlice";
import axios from "axios";

export default function GetAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setGetAppliedJobs(res.data.application));
          console.log("Applied Jobs:", res.data.application);
        }
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    };

    getAppliedJobs();
  }, [dispatch]);

  // Optional: nothing to render
  return null;
}
