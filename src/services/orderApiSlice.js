import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { ordersListUrl } from "../config/config";

// Create an adapter for the orders list
const ordersListAdapter = createEntityAdapter({
  selectId: (retailer) => retailer.id, // Assuming each retailer has a unique `id`
});

// Get the initial state from the adapter
const initialOrdersState = ordersListAdapter.getInitialState();

// Define the slice
export const ordersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query({
      query: () => ordersListUrl, // No params, use the URL directly
      transformResponse: (responseData) => {
        // Map the response data to add additional fields if needed
        const loadedOrdersList = responseData.data.map((item) => ({
          ...item,
          // Add additional transformation logic if necessary
        }));

        // Use the adapter to set all items in the state
        return ordersListAdapter.setAll(
          initialOrdersState,
          loadedOrdersList
        );
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "orders", id: "ordersList" }];
        }
        return [
          { type: "orders", id: "ordersList" },
          ...result.ids.map((id) => ({ type: "orders", id })),
        ];
      },
    }),
  }),
});

// Export the hook
export const { useGetOrdersListQuery } = ordersListSlice;

// Define selectors
const ordersListSelector = ordersListSlice.endpoints.getOrdersList.select();

const selectOrdersListResult = (state) => ordersListSelector(state);
const selectOrdersListData = createSelector(
  [selectOrdersListResult],
  (ordersListResult) => ordersListResult?.data ?? initialOrdersState
);

export const {
  selectAll: selectOrders,
  selectById: selectRetailerById,
  selectIds: selectRetailerIds,
} = ordersListAdapter.getSelectors((state) => {
  const data = selectOrdersListData(state);
  return data;
});
