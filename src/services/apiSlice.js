import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";
import { baseUrl, version, mode, role } from "../config/config";

const URL = `${baseUrl}${version}${mode}${role}`;

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "login",
    "user",
    "prexo",
    "vrp",
    "spares",
    "new_phones",
    "sellers",
    "statuses",
    "request",
    "spares_lot",
    "advertisement",
    "advertisementList",
    "mastersvrp",
    "mastersspares",
    "mastersnew_phones",
    "mastersopen_box",
    "mastersprexo",
    "vrpbrands",
    "sparesbrands",
    "new_phonesbrands",
    "prexobrands",
    "open_boxbrands",
    "vrpmodels",
    "sparesmodels",
    "new_phonesmodels",
    "prexomodels",
    "open_boxmodels",
    "mastersvariantspares",
    'mastersvariantnew_phones',
    "mastersvariantopen_box",
    "mastersvariantprexo"
  ],
  endpoints: (builder) => ({}),
});
