import { createSlice } from "@reduxjs/toolkit";

const advertisementActionModalSlice = createSlice({
  name: "advertisementActionModal",
  initialState: {
    isOpen: false,
    modalData: {
      id: null,
      action: null,
      category: null,
      categoryLabel: null,
      page: null,
      url: null,
      mediaType: null,
      urlLabel: null,
      sequence: null,
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
        mediaType: action.payload.mediaType,
        urlLabel: action.payload.urlLabel,
        sequence: action.payload.sequence,
      };
    },
    onClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        id: null,
        action: null,
        category: null,
        categoryLabel: null,
        page: null,
        url: null,
        mediaType: null,
        urlLabel: null,
        sequence: null,
      };
    },
    updateUrlAndLabel: (state, action) => {
      state.modalData.url = action.payload.url;
      state.modalData.urlLabel = action.payload.urlLabel;
    },
  },
});

export const { onOpen, onClose, updateUrlAndLabel } = advertisementActionModalSlice.actions;

export const selectAdvertisementActionModalState = (state) =>
  state.advertisementActionModal;

export default advertisementActionModalSlice.reducer;
