import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const mastersVrpListAdapter = createEntityAdapter({
  selectId: (mastersVrp) => mastersVrp.id,
});

const initialState = mastersVrpListAdapter.getInitialState();

export const mastersVrpListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMastersVrpList: builder.query({
      query: ({ vrp_no }) => {
        return vrp_no ? `masters/vrp?vrp_no=${vrp_no}` : "masters/vrp";
      },

      transformResponse: (responseData) => {
        const loadedVrpList = responseData.data.map((item) => ({
          ...item,
          modifiedModel: item.model ? item.model.toUpperCase() : null,
          modifiedBrand: item.brand ? item.brand.toUpperCase() : null,
          modifiedRam: item.ram ? item.ram.toUpperCase() : null,
          modifiedRom: item.rom ? item.rom.toUpperCase() : null,
          modifiedColor: item.color ? item.color.toUpperCase() : null,
        }));

        console.log(loadedVrpList);
        return mastersVrpListAdapter.setAll(initialState, loadedVrpList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: `mastersvrp`, id: `mastersvrp` }];
        }
        return [
          { type: `mastersvrp`, id: `mastersvrp` },
          ...result.ids.map((id) => ({ type: `mastersvrp`, id })),
        ];
      },
    }),
  }),
});

export const { useGetMastersVrpListQuery } = mastersVrpListSlice;

const mastersVrpFilter = (state) => state.mastersVrpFilter;

const selectMastersVrpListResult = createSelector(
  [mastersVrpFilter, (state) => state],
  (filter, state) => {
    const result = mastersVrpListSlice.endpoints.getMastersVrpList.select({
      vrp_no: filter.vrp_no,
    })(state);
    return result;
  }
);

const selectMastersVrpListData = createSelector(
  [selectMastersVrpListResult],
  (mastersVrpListResult) => mastersVrpListResult?.data ?? initialState
);

export const {
  selectAll: selectMastersVrpList,
  selectById: selectMastersVrpById,
  selectIds: selectMastersVrpIds,
} = mastersVrpListAdapter.getSelectors((state) => {
  const data = selectMastersVrpListData(state);
  return data;
});
