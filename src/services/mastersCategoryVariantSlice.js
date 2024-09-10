import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const mastersVariantListAdapter = createEntityAdapter({
  selectId: (mastersVariant) => mastersVariant.id,
});

const initialState = mastersVariantListAdapter.getInitialState();

export const mastersVariantListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMastersVariantList: builder.query({
      query: ({ category, brand, model }) => {
        return `masters/${category}/variants?brand=${brand}&model=${model}`;
      },

      transformResponse: (responseData) => {
        const data = responseData?.data?.variants ?? [];
        const loadedMastersVariantList = data.map((item) => ({
          ...item,
          modifiedColor: item.color ? item.color.toUpperCase() : null,
        }));
        console.log(loadedMastersVariantList);

        return mastersVariantListAdapter.setAll(
          initialState,
          loadedMastersVariantList
        );
      },

      providesTags: (result, error, arg) => [
        {
          type: `mastersvariant${arg.category}`,
          id: `mastersvariant${arg.category}`,
        },
        ...(result
          ? result.ids.map((id) => ({
              type: `mastersvariant${arg.category}`,
              id,
            }))
          : []),
      ],
    }),
  }),
});

export const { useGetMastersVariantListQuery } = mastersVariantListSlice;

const mastersVariantFilter = (state) => state.mastersVariantFilter;

const selectMastersVariantListResult = createSelector(
  [mastersVariantFilter, (state) => state],
  (filter, state) => {
    const result =
      mastersVariantListSlice.endpoints.getMastersVariantList.select({
        category: filter.category,
        brand: filter.brand,
        model: filter.model,
      })(state);
    return result;
  }
);

const selectMastersVariantListData = createSelector(
  [selectMastersVariantListResult],
  (mastersVariantListResult) => mastersVariantListResult?.data ?? initialState
);

export const {
  selectAll: selectMastersVariantList,
  selectById: selectMastersVariantById,
  selectIds: selectMastersVariantIds,
} = mastersVariantListAdapter.getSelectors((state) => {
  const data = selectMastersVariantListData(state);
  return data;
});
