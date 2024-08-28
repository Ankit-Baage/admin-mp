import { createSlice } from "@reduxjs/toolkit";
const imagePreviewSlice = createSlice({
  name: "imagePreview",
  initialState: {
    isOpen: false,
    url: null,
  },
  reducers: {
    openImage: (state, action) => {
      state.isOpen = true;
      state.url = action.payload.url;
    },
    closeImage: (state) => {
      state.isOpen = false;
      state.url = null;
    },
  },
});

export const { openImage, closeImage } = imagePreviewSlice.actions;
export const selectImagePreviewState = (state) => state.imagePreview;

export default imagePreviewSlice.reducer;
