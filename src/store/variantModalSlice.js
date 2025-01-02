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
      ram: null,
      rom: null,
      color: null,
      part_name: null,
      price: null,
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
        ram: action.payload.ram,
        rom: action.payload.rom,
        model: action.payload.model,
        color: action.payload.color,
        part_name: action.payload.part_name,
        price: action.payload.price,
        original_price: action.payload.original_price,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.variantData = {
        id: null,
        action: null,
        category: null,
        brand: null,
        ram: null,
        rom: null,
        model: null,
        color: null,
        part_name: null,
        price: null,
        original_price: null,
      };
    },
  },
});

export const { onOpen, onClose } = variantModalSlice.actions;

export const selectVariantModalState = (state) => state.variantModal;

export default variantModalSlice.reducer;
