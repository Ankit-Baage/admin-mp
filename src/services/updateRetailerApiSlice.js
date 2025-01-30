import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

export const updateRetailerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateRetailerList: builder.mutation({
      query: ({ id, status }) => ({
        url: "retailers",
        method: "PATCH",
        body: { id, status },
      }),

      onQueryStarted: async ({ id, status }, { dispatch, queryFulfilled }) => {
        // Optimistic Update: Update the cache immediately
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getRetailersList", undefined, (draft) => {
            const retailer = draft.entities?.[id];
            if (retailer) {
              retailer.status = status; // Optimistic update
            }
          })
        );

        try {
          const { data } = await queryFulfilled;

          // Ensure API response contains expected fields
          if (data?.status) {
            dispatch(
              apiSlice.util.updateQueryData("getRetailersList", undefined, (draft) => {
                const retailer = draft.entities?.[id];
                if (retailer) {
                  retailer.status = data.status; // Update with actual response
                }
              })
            );
          } else {
            console.warn("Unexpected API response:", data);
          }
        } catch (err) {
          console.error("Update retailer failed:", err);
          patchResult.undo(); // Rollback the optimistic update on error
        }
      },

      invalidatesTags: (result, error, { id }) => [
        { type: "retailers", id }, // Only invalidate the updated retailer, not the entire list
      ],
    }),
  }),
});

export const { useUpdateRetailerListMutation } = updateRetailerApiSlice;
