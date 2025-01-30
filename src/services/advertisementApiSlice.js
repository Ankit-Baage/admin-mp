import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import {
  buildQueryString,
  extractReadableLabel,
} from "../utils/buildQueryString";

const categoryLabels = {
  spares: "SPARES",
  vrp: "VRP",
  prexo: "PREXO",
  open_box: "OPEN BOX",
  new_phones: "NEW PHONE",
  home: "HOME",
};

const advertisementListAdapter = createEntityAdapter({
  selectId: (advertisement) => advertisement.id,
});

const initialState = advertisementListAdapter.getInitialState();

export const advertisementListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvertisementList: builder.query({
      query: (filters) => buildQueryString("advertisement", filters),
      transformResponse: (responseData) => {
        const loadedAdvertisementList = responseData.data.map((item) => ({
          ...item,
          categoryLabel: categoryLabels[item.category] || "UNKNOWN",
          urlLabel: extractReadableLabel(item.url),
        }));

        console.log(loadedAdvertisementList);
        return advertisementListAdapter.setAll(
          initialState,
          loadedAdvertisementList
        );
      },
      providesTags: (result) => {
        if (!result) {
          return [{ type: "advertisement", id: "advertisementList" }];
        }
        return [
          { type: "advertisement", id: "advertisementList" },
          ...result.ids.map((id) => ({ type: "advertisement", id })),
        ];
      },
    }),
  }),
});

export const { useGetAdvertisementListQuery } = advertisementListSlice;

const advertisementFilter = (state) => state.advertisementFilter;

const selectCategoryListResult = createSelector(
  [advertisementFilter, (state) => state],
  (filter, state) => {
    const result = advertisementListSlice.endpoints.getAdvertisementList.select(
      {
        category: filter.category,
        page: filter.page,
      }
    )(state);
    return result;
  }
);

const selectAdvertisementListData = createSelector(
  [selectCategoryListResult],
  (advertisementListResult) => advertisementListResult?.data ?? initialState
);

export const {
  selectAll: selectAdvertisementList,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = advertisementListAdapter.getSelectors((state) => {
  const data = selectAdvertisementListData(state);
  return data;
});
