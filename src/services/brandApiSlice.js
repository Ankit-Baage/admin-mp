import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const brandListAdapter = createEntityAdapter({
  selectId: (brand) => brand.id,
});

const initialState = brandListAdapter.getInitialState();

export const brandListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandList: builder.query({
      query: ({ category }) => `masters/${category}/brands`,
      transformResponse: (responseData) => {
        const loadedBrandList = responseData.data;
        console.log(loadedBrandList);
        return brandListAdapter.setAll(initialState, loadedBrandList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [
            { type: `${arg.category}brands`, id: `${arg.category}brands` },
          ];
        }
        return [
          { type: `${arg.category}brands`, id: `${arg.category}brands` },
          ...result.ids.map((id) => ({ type: `${arg.category}brands`, id })),
        ];
      },
    }),
  }),
});

export const { useGetBrandListQuery } = brandListSlice;

const mastersCategoryFilter = (state) => state.mastersCategoryFilter;

const selectBrandListResult = createSelector(
  [mastersCategoryFilter, (state) => state],
  (filter, state) => {
    const result = brandListSlice.endpoints.getBrandList.select({
      category: filter.category,
    })(state);
    return result;
  }
);

const selectBrandListData = createSelector(
  [selectBrandListResult],
  (brandListResult) => brandListResult?.data ?? initialState
);

export const {
  selectAll: selectBrandList,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = brandListAdapter.getSelectors((state) => {
  const data = selectBrandListData(state);
  return data;
});
