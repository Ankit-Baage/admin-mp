import { createSlice } from "@reduxjs/toolkit";

const mastersCategoryFilterSlice = createSlice({
  name: "mastersCategoryFilter",
  initialState: {
    category: null,
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
  mastersCategoryFilterSlice.actions;

export const selectMastersCategoryFilterState = (state) => state.mastersCategoryFilter;

export default mastersCategoryFilterSlice.reducer;
