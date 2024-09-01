import { createSlice } from "@reduxjs/toolkit";

const advertisementActionModalSlice = createSlice({
  name: "advertisementActionModal",
  initialState: {
    isOpen: false,
    modalData: {
      id: "",
      action: "",
      category: "",
      categoryLabel: "",
      page: "",
      url: "",
      media_type: "",
      urlLabel: "",
      sequence: "",
    },
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = {
        id: action.payload.id,
        action: action.payload.action,
        category: action.payload.category,
        categoryLabel: action.payload.categoryLabel,
        page: action.payload.page,
        url: action.payload.url,
        media_type: action.payload.media_type,
        urlLabel: action.payload.urlLabel,
        sequence: action.payload.sequence,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        id: "",
        action: "",
        category: "",
        categoryLabel: "",
        page: "",
        url: "",
        media_type: "",
        urlLabel: "",
        sequence: "",
      };
    },
    updateUrlAndLabel: (state, action) => {
      state.modalData = {
        ...state.modalData, 
        url: action.payload.url,
        urlLabel: action.payload.urlLabel,
      };
    },
  },
});

export const { onOpen, onClose, updateUrlAndLabel } =
  advertisementActionModalSlice.actions;

export const selectAdvertisementActionModalState = (state) =>
  state.advertisementActionModal;

export default advertisementActionModalSlice.reducer;
