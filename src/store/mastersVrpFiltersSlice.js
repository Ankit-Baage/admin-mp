import { createSlice } from "@reduxjs/toolkit";
const mastersVrpFilterSlice = createSlice({
  name: "mastersVrpFilter",
  initialState: {
    vrp_no: null,
    brand: null,
    model: null,
  },
  reducers: {
    setVrp_no: (state, action) => {
      state.vrp_no = action.payload.vrp_no;
    },
    setFilters: (state, action) => {
      state.brand = action.payload.brand;
      state.model = action.payload.model;
    },
    clearFilters: (state) => {
      state.brand = null;
      state.model = null;
    },
  },
});

export const { setFilters, clearFilters, setVrp_no } = mastersVrpFilterSlice.actions;

export const selectMastersVrpState = (state) => state.mastersVrpFilter;

export default mastersVrpFilterSlice.reducer;
