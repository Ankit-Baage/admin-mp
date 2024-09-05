import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const mastersListAdapter = createEntityAdapter({
  selectId: (masters) => masters.id,
});

const initialState = mastersListAdapter.getInitialState();

export const mastersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMastersList: builder.query({
      query: ({ category, id, brand, model }) => {
        let queryString = `masters/${category}`;

        // Case for 'vrp' category
        if (category === "vrp" && id) {
          queryString += `?vrp_no=${id}`;
        }
        // Case for other categories with 'brand'
        else if (category !== "vrp" && brand) {
          queryString += `?brand=${brand}`;

          // If 'model' exists, append 'model' as well
          if (model) {
            queryString += `&model=${model}`;
          }
        }
        // Case for other categories with only 'model'
        else if (category !== "vrp" && model) {
          queryString += `?model=${model}`;
        }
        // If only 'id' exists
        else if (id) {
          queryString += `?id=${id}`;
        }

        return queryString;
      },
      transformResponse: (responseData) => {
        const loadedMastersList = responseData.data;
        console.log(loadedMastersList);
        return mastersListAdapter.setAll(initialState, loadedMastersList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "masters", id: "masters" }];
        }
        return [
          { type: "masters", id: "masters" },
          ...result.ids.map((id) => ({ type: "masters", id })),
        ];
      },
    }),
  }),
});

export const { useGetMastersListQuery } = mastersListSlice;

const mastersFilter = (state) => state.mastersFilter;

const selectMastersListResult = createSelector(
  [mastersFilter, (state) => state],
  (filter, state) => {
    const result = mastersListSlice.endpoints.getMastersList.select({
      id: filter.id,
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
