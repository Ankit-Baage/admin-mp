// store.js
import { configureStore } from "@reduxjs/toolkit";

import backdropReducer from "./backdropSlice";
import toasterReducer from "./toaster/toasterSlice";
import phoneNumberReducer from "./authentication/phoneNumberSlice";
import spinnerReducer from "./spinnerSlice";
import priorityReducer from "./sellerPriorityModal/sellerPriorityModalSlice"

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    toaster: toasterReducer,
    phoneNumber: phoneNumberReducer,
    spinner: spinnerReducer,
    priorityModal:priorityReducer
    // Add other reducers if any
  },
});
