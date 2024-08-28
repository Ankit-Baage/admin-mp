import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const pageListAdapter = createEntityAdapter({
  selectId: (page) => page.id,
});

const initialState = pageListAdapter.getInitialState();

export const pageListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageList: builder.query({
      query: () => `advertisement/pages`,
      transformResponse: (responseData) => {
        const loadedPageList = responseData.data.map((item) => {
          return {
            ...item,
            itemLabel: item.label,
          };
        });
        console.log(loadedPageList);
        return pageListAdapter.setAll(initialState, loadedPageList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "pages", id: "pageList" }];
        }
        return [
          { type: "pages", id: "pageList" },
          ...result.ids.map((id) => ({ type: "pages", id })),
        ];
      },
    }),
  }),
});

export const { useGetPageListQuery } = pageListSlice;

const selectPageListResult = pageListSlice.endpoints.getPageList.select();

const selectPageListData = createSelector(
  selectPageListResult,
  (pageListResult) => pageListResult?.data ?? initialState
);

export const {
  selectAll: selectPageList,
  selectById: selectPageById,
  selectIds: selectPageByIds,
} = pageListAdapter.getSelectors((state) => {
  const data = selectPageListData(state);
  return data;
});
