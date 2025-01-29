import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import mastersVrpFilterReducer from "./mastersVrpFiltersSlice";
import mastersCategoryFilterReducer from "./mastersCategoryFilterSlice";
import mastersVariantFilterReducer from "./mastersVariantFilterSlice";

import actionModalReducer from "./actionModalSlice";
import priorityModalReducer from "./priorityModalSlice";
import advertisementFilterReducer from "./advertisementFilterSlice";
import advertisementActionModalReducer from "./advertisementActionModalSlice";

import variantModalReducer from "./variantModalSlice";
import mediaPreviewReducer from "./mediaPreviewSlice";
import mastersVrpActionModalReducer from "./mastersVrpActionModalSlice";
import orderFilterReducer from "./orderFilterSlice";
import orderActionModalReducer from "./orderActionModalSlice";
import retailerFilterReducer from "./retailerFilterSlice";
import retailerActionModalReducer from "./retailerActionModalSlice";
import modalReducer from "./modalSlice"

const appReducer = combineReducers({
  auth: authReducer,
  categoryFilter: categoryFilterReducer,
  orderFilter: orderFilterReducer,
  orderActionModal: orderActionModalReducer,
  retailerFilter:retailerFilterReducer,
  retailerActionModal: retailerActionModalReducer,
  modal: modalReducer,

  actionModal: actionModalReducer,
  advertisementActionModal: advertisementActionModalReducer,
  mastersVrpFilter: mastersVrpFilterReducer,
  mastersCategoryFilter: mastersCategoryFilterReducer,
  mastersVariantFilter: mastersVariantFilterReducer,
  mastersVrpActionModal: mastersVrpActionModalReducer,
  variantModal: variantModalReducer,
  priorityModal: priorityModalReducer,
  advertisementFilter: advertisementFilterReducer,
  mediaPreview: mediaPreviewReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
