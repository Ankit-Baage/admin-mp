import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const moduleListAdapter = createEntityAdapter({
  selectId: (module) => module.id,
});

const initialState = moduleListAdapter.getInitialState();

export const moduleListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModuleList: builder.query({
      query: () => `advertisement/modules`,
      transformResponse: (responseData) => {
        const loadedModuleList = responseData.data.map((item) => {
          // Add categoryLabel based on category
          let itemLabel = "";
          switch (item.label) {
            case "vrp":
              itemLabel = "VRP";
              break;
            case "spares":
              itemLabel = "SPARES";
              break;
            case "prexo":
              itemLabel = "PREXO";
              break;
            case "open_box":
              itemLabel = "OPEN BOX";
              break;
            case "new_phones":
              itemLabel = "NEW PHONE";
              break;
            case "home":
              itemLabel = "HOME";
              break;
            default:
              itemLabel = "UNKNOWN";
              break;
          }

          return {
            ...item,
            itemLabel,
          };
        });
        console.log("moduleList: ",loadedModuleList);
        return moduleListAdapter.setAll(initialState, loadedModuleList);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "modules", id: "moduleList" }];
        }
        return [
          { type: "modules", id: "moduleList" },
          ...result.ids.map((id) => ({ type: "modules", id })),
        ];
      },
    }),
  }),
});

export const { useGetModuleListQuery } = moduleListSlice;

const selectModuleListResult = moduleListSlice.endpoints.getModuleList.select();

const selectModuleListData = createSelector(
  selectModuleListResult,
  (moduleListResult) => moduleListResult?.data ?? initialState
);

export const {
  selectAll: selectModuleList,
  selectById: selectModuleById,
  selectIds: selectModuleByIds,
} = moduleListAdapter.getSelectors((state) => {
  const data = selectModuleListData(state);
  return data;
});
