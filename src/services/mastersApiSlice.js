import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const mastersListAdapter = createEntityAdapter({
  selectId: (masters) => masters.id,
});

const initialState = mastersListAdapter.getInitialState();

export const mastersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMastersList: builder.query({
      query: ({ category, brand, model }) => {
        let queryString = `masters/${category}`;

        let queryParams = [];
        if (brand) queryParams.push(`brand=${brand}`);
        if (model) queryParams.push(`model=${model}`);
        if (queryParams.length > 0) {
          queryString += `?${queryParams.join("&")}`;
        }

        return queryString;
      },

      transformResponse: (responseData) => {
        const data = responseData?.data ?? [];
        const loadedMastersList = data.map((item) => ({
          ...item,
          modifiedModel: item.model ? item.model.toUpperCase() : null,
          modifiedBrand: item.brand ? item.brand.toUpperCase() : null,
          modifiedColor: item.color?item.color.toUpperCase() : null,
          modifiedPartName: item["part_name"]
            ? item.part_name.toUppercase()
            : null,
        }));
        console.log(loadedMastersList);

        return mastersListAdapter.setAll(initialState, loadedMastersList);
      },

      providesTags: (result, error, arg) => [
        { type: `masters${arg.category}`, id: `masters${arg.category}` },
        ...(result
          ? result.ids.map((id) => ({ type: `masters${arg.category}`, id }))
          : []),
      ],
    }),
  }),
});

export const { useGetMastersListQuery } = mastersListSlice;

const mastersCategoryFilter = (state) => state.mastersCategoryFilter;

const selectMastersListResult = createSelector(
  [mastersCategoryFilter, (state) => state],
  (filter, state) => {
    const result = mastersListSlice.endpoints.getMastersList.select({
      category: filter.category,
      brand: filter.brand,
      model: filter.model,
    })(state);
    return result;
  }
);

const selectMastersListData = createSelector(
  [selectMastersListResult],
  (mastersListResult) => mastersListResult?.data ?? initialState
);

export const {
  selectAll: selectMastersList,
  selectById: selectMastersById,
  selectIds: selectMastersIds,
} = mastersListAdapter.getSelectors((state) => {
  const data = selectMastersListData(state);
  return data;
});
