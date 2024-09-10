import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const modelListAdapter = createEntityAdapter({
  selectId: (model) => model.id,
});

const initialState = modelListAdapter.getInitialState();

export const modelListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModelList: builder.query({
      query: ({ category }) => `masters/${category}/models`,
      transformResponse: (responseData) => {
        const loadedModelList = responseData.data;
        console.log(loadedModelList);
        return modelListAdapter.setAll(initialState, loadedModelList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [
            { type: `${arg.category}models`, id: `${arg.category}models` },
          ];
        }
        return [
          { type: `${arg.category}models`, id: `${arg.category}models` },
          ...result.ids.map((id) => ({ type: `${arg.category}models`, id })),
        ];
      },
    }),
  }),
});

export const { useGetModelListQuery } = modelListSlice;

const mastersCategoryFilter = (state) => state.mastersCategoryFilter;

const selectModelListResult = createSelector(
  [mastersCategoryFilter, (state) => state],
  (filter, state) => {
    const result = modelListSlice.endpoints.getModelList.select({
      category: filter.category,
    })(state);
    return result;
  }
);

const selectModelListData = createSelector(
  [selectModelListResult],
  (modelListResult) => modelListResult?.data ?? initialState
);

export const {
  selectAll: selectModelList,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = modelListAdapter.getSelectors((state) => {
  const data = selectModelListData(state);
  return data;
});
