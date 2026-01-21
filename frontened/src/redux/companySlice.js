import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    registerCompanyData: [], // array of companies
    singleCompanyData: null, // single company object
  },
  reducers: {
    setUploadRegisterCompanyData: (state, action) => {
      state.registerCompanyData = action.payload;
    },
    setSingleCompanyData: (state, action) => {
      state.singleCompanyData = action.payload;
    },
  },
});

export const { setUploadRegisterCompanyData, setSingleCompanyData } =
  companySlice.actions;

export default companySlice.reducer;
