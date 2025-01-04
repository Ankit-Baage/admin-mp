import { createSlice } from "@reduxjs/toolkit";

const retailerActionModalSlice = createSlice({
  name: "retailerActionModal",
  initialState: {
    isOpen: false,
    modalData: {}, // Store the entire object
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = action.payload; // Store the entire object passed in the payload
    },
    onClose: (state) => {
      state.isOpen = false;
      state.modalData = {}; // Clear modal data on close
    },
    updateUrlAndLabel: (state, action) => {
      // Update url and urlLabel within modalData
      state.modalData = {
        ...state.modalData,
        ...action.payload,
      };
    },
  },
});

export const { onOpen, onClose, updateUrlAndLabel } = retailerActionModalSlice.actions;

export const selectRetailerActionModalState = (state) => state.retailerActionModal;

export default retailerActionModalSlice.reducer;
