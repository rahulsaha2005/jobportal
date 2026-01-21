import axios from "axios";
import React, { useEffect } from "react";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { setUploadRegisterCompanyData } from "../../redux/companySlice";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const gettingRegisteredCompanyByRecuriter = async () => {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUploadRegisterCompanyData(res.data.companies));
        }
      };
      gettingRegisteredCompanyByRecuriter();
    } catch (error) {
      toast("failed to get companies info");
      console.log(error);
    }
  }, []);
  return null;
}
