import { createSlice } from "@reduxjs/toolkit";
const mastersVrpFilterSlice = createSlice({
  name: "mastersVrpFilter",
  initialState: {
    vrp_no: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.vrp_no = action.payload.vrp_no;
    },
    clearFilters: (state) => {
      state.vrp_no = null;
    },
  },
});

export const { setFilters, clearFilters } = mastersVrpFilterSlice.actions;

export const selectMastersVrpState = (state) => state.mastersVrpFilter;

export default mastersVrpFilterSlice.reducer;
