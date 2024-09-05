import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import mastersFilterReducer from "./mastersFiltersSlice";
import actionModalReducer from "./actionModalSlice";
import priorityModalReducer from "./priorityModalSlice";
import advertisementFilterReducer from "./advertisementFilterSlice";
import advertisementActionModalReducer from "./advertisementActionModalSlice";
import mediaPreviewReducer from "./mediaPreviewSlice";
import { apiSlice } from "../services/apiSlice";

const appReducer = combineReducers({
  auth: authReducer,
  categoryFilter: categoryFilterReducer,
  mastersFilter: mastersFilterReducer,
  actionModal: actionModalReducer,
  advertisementActionModal: advertisementActionModalReducer,
  priorityModal: priorityModalReducer,
  advertisementFilter: advertisementFilterReducer,
  mediaPreview: mediaPreviewReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
