import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    getAppliedJobs: [], // changed from GetAppliedJob
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setGetAppliedJobs: (state, action) => {
      state.getAppliedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setGetAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;
