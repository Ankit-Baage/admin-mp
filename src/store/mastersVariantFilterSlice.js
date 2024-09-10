import { createSlice } from "@reduxjs/toolkit";
const mastersVariantFilterSlice = createSlice({
  name: "mastersVariantFilter",
  initialState: {
    category: null,
    brand: null,
    model: null,
  },
  reducers: {
    setVariantFilters: (state, action) => {
      state.category = action.payload.category;
      state.brand = action.payload.brand;
      state.model = action.payload.model;
    },

    clearVariantFilters: (state) => {
      state.category = null;
      state.brand = null;
      state.model = null;
    },
  },
});

export const { setVariantCategory, setVariantFilters, clearVariantFilters } =
  mastersVariantFilterSlice.actions;
export const selectMastersVariantState = (state) => state.mastersVariantFilter;

export default mastersVariantFilterSlice.reducer;
