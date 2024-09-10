import { createSlice } from "@reduxjs/toolkit";

const variantModalSlice = createSlice({
  name: "variantModal",
  initialState: {
    isOpen: false,
    variantData: {
      id: null,
      action: null,
      category: null,
      brand: null,
      model: null,
      part_name: null,
      price: "",
      original_price: null,
    },
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.variantData = {
        id: action.payload.id,
        action: action.payload.action,
        category: action.payload.category,
        brand: action.payload.brand,
        model: action.payload.model,
        part_name: action.payload.part_name,
        price: action.payload.price,
        original_price: action.payload.original_price,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.variantData = {
        id: "",
        action: "",
        category: "",
        brand: "",
        model: "",
        part_name: "",
        price: "",
        original_price: "",
      };
    },
  },
});

export const { onOpen, onClose } = variantModalSlice.actions;

export const selectVariantModalState = (state) => state.variantModal;

export default variantModalSlice.reducer;
