import { createSlice } from "@reduxjs/toolkit";
const mastersFilterSlice = createSlice({
  name: "mastersFilter",
  initialState: {
    category: null,
    id: null,
    brand: null,
    model: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category;
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

export const { setCategory, setFilters, clearFilters } =
  mastersFilterSlice.actions;
export const selectMastersState = (state) => state.mastersFilter;

export default mastersFilterSlice.reducer;
