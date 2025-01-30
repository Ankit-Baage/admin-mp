import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

export const updateOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderList: builder.mutation({
      query: ({ payment_id, url = "", status }) => ({
        url: "orders",
        method: "PATCH",
        body: {
          payment_id,
          url,
          status,
        },
      }),
      onQueryStarted: async (
        { id, payment_id, url, status },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          console.log("API Full Response:", data); // Log full response

          // Validate response data
          if (data?.status) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getOrdersList",
                undefined,
                (draft) => {
                  const order = draft.entities?.[id];
                  if (order) {
                    order.status = status; // Use the status you sent
                    order.url = url; // Use the URL you sent
                  }
                }
              )
            );
          } else {
            console.warn("Unexpected API response format:", data);
          }
        } catch (err) {
          console.error("Update order failed:", err);
          toast.error("Failed to update the order. Please try again.");
        }
      },

      invalidatesTags: (result, error, { id }) => [
        { type: "orders", id: "ordersList" }, // Invalidate the entire orders list
        ...(id ? [{ type: "orders", id }] : []), // Also invalidate the specific order if an ID is present
      ],
    }),
  }),
});

export const { useUpdateOrderListMutation } = updateOrderApiSlice;
