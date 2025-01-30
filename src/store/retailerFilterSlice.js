import { createSlice } from "@reduxjs/toolkit";

const retailerFilterSlice = createSlice({
  name: "retailerFilter",
  initialState: {
    status: null,
    search:null,
  },
  reducers: {
    setRetailerFilter: (state, action) => {
      state.status = action.payload.status || null;
      state.search = action.payload.search || null;
    },

    clearRetailerFilters: (state) => {
      state.status = null;
      state.search = null;
    },
  },
});

export const { setRetailerFilter, clearRetailerFilters } = retailerFilterSlice.actions;

export const selectRetailerState = (state) =>
  state.retailerFilter;

export default retailerFilterSlice.reducer;
