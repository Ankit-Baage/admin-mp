import { createSlice } from "@reduxjs/toolkit";

const mastersVrpActionModalSlice = createSlice({
  name: "mastersVrpActionModal",
  initialState: {
    isOpen: false,
    modalData: {
      id: null,
      action:null,
      brand: null,
      model: null,
      ram: null,
      rom: null,
      color: null,
      modifiedBrand: null,
      modifiedModel: null,
      modifiedRam: null,
      modifiedRom: null,
      modifiedColor: null,
      
    },
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = {
        id: action.payload.id,
        action: action.payload.action,
        brand: action.payload.brand,
        model: action.payload.model,
        color: action.payload.color,
        ram: action.payload.ram,
        rom: action.payload.rom,
        modifiedBrand: action.payload.modifiedBrand,
        modifiedModel: action.payload.modifiedModel,
        modifiedColor: action.payload.modifiedColor,
        modifiedRam: action.payload.modifiedRam,
        modifiedRom: action.payload.modifiedRom,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        id: null,
        action:null,
        brand: null,
        model: null,
        ram: null,
        rom: null,
        color: null,
        modifiedBrand: null,
        modifiedModel: null,
        modifiedRam: null,
        modifiedRom: null,
        modifiedColor: null,
      };
    },
  },
});

export const { onOpen, onClose } =
  mastersVrpActionModalSlice.actions;

export const selectMastersVrpActionModalState = (state) =>
  state.mastersVrpActionModal;

export default mastersVrpActionModalSlice.reducer;
