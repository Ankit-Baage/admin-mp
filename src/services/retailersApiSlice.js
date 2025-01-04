import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { retailersListUrl } from "../config/config";

// Create an adapter for the retailers list
const retailersListAdapter = createEntityAdapter({
  selectId: (retailer) => retailer.id,
});

const initialRetailersState = retailersListAdapter.getInitialState();

// Define the slice
export const retailersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetailersList: builder.query({
      query: (filters) => {
        const validFilters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value != null)
        );

        // Create query parameters string
        const queryParams = new URLSearchParams(validFilters).toString();

        // If there are no valid filters, just return the base URL
        return queryParams ? `${retailersListUrl}?${queryParams}` : retailersListUrl;
      },
      transformResponse: (responseData) => {
        const loadedRetailersList = responseData.data.map((item) => {
          if (item.url) {
            const urlParts = item.url.split("/");
            const urlLabelWithExt = urlParts[urlParts.length - 1];
            return {
              ...item,
              urlLabel: urlLabelWithExt,
            };
          }

          // If you want to remove the extension and get the base name

          return {
            ...item,
            urlLabel: "", // or you can set a default value here if necessary
          };
        });

        // Use the adapter to set all items in the state
        return retailersListAdapter.setAll(initialRetailersState, loadedRetailersList);
      },
      providesTags: (result) => {
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

// Select the retailer filter state
const retailerFilter = (state) => state.retailerFilter;

// Select the retailers from the state (with applied filter)
const selectRetailersListData = createSelector(
  [(state) => state, retailerFilter],
  (state, filter) => {
    const result =
      retailersListSlice.endpoints.getRetailersList.select(filter)(state);
    return result?.data ?? initialRetailersState;
  }
);

// Adapter selectors for retailers
export const {
  selectAll: selectRetailers,
  selectById: selectRetailerById,
  selectIds: selectRetailerIds,
} = retailersListAdapter.getSelectors((state) => selectRetailersListData(state));
