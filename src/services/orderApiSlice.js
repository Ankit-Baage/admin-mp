import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { ordersListUrl } from "../config/config";
import {
  buildQueryString,
  extractReadableLabel,
} from "../utils/buildQueryString";

// Create an adapter for the orders list
const ordersListAdapter = createEntityAdapter({
  selectId: (order) => order.id,
});

const initialState = ordersListAdapter.getInitialState();

// Define the slice
export const ordersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query({
      query: (filters) => buildQueryString("orders", filters),
      transformResponse: (responseData) => {
        const loadedOrdersList = responseData.data.map((item) => {
          if (item.url) {
            return {
              ...item,
              urlLabel: extractReadableLabel(item.url),
            };
          }

          return {
            ...item,
            urlLabel: "",
          };
        });

        return ordersListAdapter.setAll(initialState, loadedOrdersList);
      },
      providesTags: (result) => {
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

// Select the order filter state
const orderFilter = (state) => state.orderFilter;

// Select the orders from the state (with applied filter)

const selectOrderListResult = createSelector(
  [orderFilter, (state) => state],
  (filter, state) => {
    const result = ordersListSlice.endpoints.getOrdersList.select({
      status: filter.status,
      search: filter.search,
    })(state);
    return result;
  }
);
const selectOrdersListData = createSelector(
  [selectOrderListResult],
  (orderListResult) => orderListResult?.data ?? initialState
);

// Adapter selectors for orders
export const {
  selectAll: selectOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersListAdapter.getSelectors((state) => {
  const data = selectOrdersListData(state);
  return data;
});
