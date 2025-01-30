import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { retailersListUrl } from "../config/config";

// Create an adapter for the retailers list
const retailersListAdapter = createEntityAdapter({
  selectId: (retailer) => retailer.id,
});

const initialState = retailersListAdapter.getInitialState();

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
        return queryParams
          ? `${retailersListUrl}?${queryParams}`
          : retailersListUrl;
      },
      transformResponse: (responseData) => {
        const loadedRetailersList = responseData.data.map((item) => {
          // Helper function to shorten the URL
          const extractReadableLabel = (url) => {
            if (url) {
              const urlParts = url.split("/");
              const fileNameWithExt = urlParts[urlParts.length - 1]; // Get the last part of the URL
              const shortFileName = fileNameWithExt.slice(0, 10); // Take first 10 characters
              const fileExtension = fileNameWithExt.split(".").pop(); // Get file extension (e.g., png)
              return `${shortFileName}...${fileExtension}`; // Add "..." and the extension at the end
            }
            return ""; // Return an empty string if URL is null
          };

          return {
            ...item,
            panUrlLabel: extractReadableLabel(item.pan_image_url),
            aadharUrlLabel: extractReadableLabel(item.aadhar_image_url),
          };
        });

        // Use the adapter to set all items in the state
        return retailersListAdapter.setAll(
          initialState,
          loadedRetailersList
        );
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

const selectRetailerListResult =createSelector(
  [retailerFilter,(state)=>state],
  (filter,state)=>{
    const result = retailersListSlice.endpoints.getRetailersList.select({
      status: filter.status,
      search:filter.search
    })(state);
    return result;
  }
)
const selectRetailersListData = createSelector(
  [selectRetailerListResult],
  (retailerListResult) => retailerListResult?.data ?? initialState
);

// Adapter selectors for retailers
export const {
  selectAll: selectRetailers,
  selectById: selectRetailerById,
  selectIds: selectRetailerIds,
} = retailersListAdapter.getSelectors((state) =>
  selectRetailersListData(state)
);
