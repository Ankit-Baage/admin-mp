import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { retailersListUrl } from "../config/config";

// Create an adapter for the retailers list
const retailersListAdapter = createEntityAdapter({
  selectId: (retailer) => retailer.id, // Assuming each retailer has a unique `id`
});

// Get the initial state from the adapter
const initialRetailersState = retailersListAdapter.getInitialState();

// Define the slice
export const retailersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetailersList: builder.query({
      query: () => retailersListUrl, // No params, use the URL directly
      transformResponse: (responseData) => {
        // Map the response data to add additional fields if needed
        const loadedRetailersList = responseData.data.map((item) => ({
          ...item,
          // Add additional transformation logic if necessary
        }));

        // Use the adapter to set all items in the state
        return retailersListAdapter.setAll(
          initialRetailersState,
          loadedRetailersList
        );
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "retailers", id: "retailersList" }];
        }
        return [
          { type: "retailers", id: "retailersList" },
          ...result.ids.map((id) => ({ type: "retailers", id })),
        ];
      },
    }),
  }),
});

// Export the hook
export const { useGetRetailersListQuery } = retailersListSlice;

// Define selectors
const retailersListSelector = retailersListSlice.endpoints.getRetailersList.select();

const selectRetailersListResult = (state) => retailersListSelector(state);
const selectRetailersListData = createSelector(
  [selectRetailersListResult],
  (retailersListResult) => retailersListResult?.data ?? initialRetailersState
);

export const {
  selectAll: selectRetailers,
  selectById: selectRetailerById,
  selectIds: selectRetailerIds,
} = retailersListAdapter.getSelectors((state) => {
  const data = selectRetailersListData(state);
  return data;
});
