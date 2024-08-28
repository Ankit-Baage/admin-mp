import { createSlice } from "@reduxjs/toolkit";
const advertisementFilterSlice = createSlice({
  name: "advertisementFilter",
  initialState: {
    category: null,
    page: null,
  },
  reducers: {
    setAdvertisementFilters: (state, action) => {
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    clearAdvertisementFilters: (state) => {
      state.category = null;
      state.page = null;
    },
  },
});

export const { setAdvertisementFilters, clearAdvertisementFilters } =
  advertisementFilterSlice.actions;
export const selectAdvertisementState = (state) => state.advertisementFilter;

export default advertisementFilterSlice.reducer;
