import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant.js";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";

export default function GetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getJob = async (req, res) => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJob();
  }, []);
}
