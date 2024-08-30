import { createSlice } from "@reduxjs/toolkit";
const mediaPreviewSlice = createSlice({
  name: "mediaPreview",
  initialState: {
    isOpen: false,
    url: null,
    media_type:null,
  },
  reducers: {
    openMedia: (state, action) => {
      state.isOpen = true;
      state.url = action.payload.url;
      state.media_type = action.payload.media_type
    },
    closeMedia: (state) => {
      state.isOpen = false;
      state.url = null;
      state.media_type = null;
    },
  },
});

export const { openMedia, closeMedia } = mediaPreviewSlice.actions;
export const selectMediaPreviewState = (state) => state.mediaPreview;

export default mediaPreviewSlice.reducer;
