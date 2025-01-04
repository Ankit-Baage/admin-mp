import { createSlice } from "@reduxjs/toolkit";

const retailerFilterSlice = createSlice({
  name: "retailerFilter",
  initialState: {
    status: null,
  },
  reducers: {
    setRetailerFilter: (state, action) => {
      state.status = action.payload.status;
    },

    clearRetailerFilters: (state) => {
      state.status = null;
    },
  },
});

export const { setRetailerFilter, clearRetailerFilters } = retailerFilterSlice.actions;

export const selectRetailerState = (state) =>
  state.retailerFilter;

export default retailerFilterSlice.reducer;
