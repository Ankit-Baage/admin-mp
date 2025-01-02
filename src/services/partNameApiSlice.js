import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const partNameListAdapter = createEntityAdapter({
  selectId: (partName) => partName.id,
});

const initialState = partNameListAdapter.getInitialState();

export const partNameListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartNameList: builder.query({
      query: ({ category }) => `masters/${category}/part_names`,
      transformResponse: (responseData) => {
        const loadedPartNameList = responseData.data;
        console.log(loadedPartNameList);
        return partNameListAdapter.setAll(initialState, loadedPartNameList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [
            { type: `${arg.category}partNames`, id: `${arg.category}partNames` },
          ];
        }
        return [
          { type: `${arg.category}partNames`, id: `${arg.category}partNames` },
          ...result.ids.map((id) => ({ type: `${arg.category}partNames`, id })),
        ];
      },
    }),
  }),
});

export const { useGetPartNameListQuery } = partNameListSlice;

const mastersCategoryFilter = (state) => state.mastersCategoryFilter;

const selectPartNameListResult = createSelector(
  [mastersCategoryFilter, (state) => state],
  (filter, state) => {
    const result = partNameListSlice.endpoints.getPartNameList.select({
      category: filter.category,
    })(state);
    return result;
  }
);

const selectPartNameListData = createSelector(
  [selectPartNameListResult],
  (partNameListResult) => partNameListResult?.data ?? initialState
);

export const {
  selectAll: selectPartNameList,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = partNameListAdapter.getSelectors((state) => {
  const data = selectPartNameListData(state);
  return data;
});
