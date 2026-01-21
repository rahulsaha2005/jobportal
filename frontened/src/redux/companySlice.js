import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    registerCompanyData: [],
  },
  reducers: {
    setUploadRegisterCompanyData: (state, action) => {
      state.registerCompanyData = action.payload;
    },
  },
});

export const { setUploadRegisterCompanyData } = companySlice.actions;
export default companySlice.reducer;
