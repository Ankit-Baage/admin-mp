import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

export const updateOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderList: builder.mutation({
      query: ({ id, url, status }) => ({
        url: "orders",
        method: "PATCH",
        body: {
          id,
          url,
          status,
        },
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // Validate response data
          if (data?.status && data?.url) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getOrdersList",
                undefined,
                (draft) => {
                  const order = draft.entities?.[id];
                  if (order) {
                    order.status = data.status;
                    order.url = data.url;
                  }
                }
              )
            );
          } else {
            console.warn("Unexpected API response:", data);
          }
        } catch (err) {
          console.error("Update order failed:", err);
          // Optional: Refetch the order list to ensure data integrity
          // dispatch(apiSlice.util.invalidateTags([{ type: "orders", id }]));
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "orders", id },
      ],
    }),
  }),
});

export const { useUpdateOrderListMutation } = updateOrderApiSlice;
