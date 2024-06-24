import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const prioritySlice = createSlice({
  name: "priorityModal",
  initialState,
  reducers: {
    openPriorityModal: (state) => {
      state.isModalOpen = true;
    },
    closePriorityModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openPriorityModal, closePriorityModal } = prioritySlice.actions;
export const selectPriorityModalState = (state) => state.priorityModal;

export default prioritySlice.reducer;
