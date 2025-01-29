import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

export const updateRetailerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateRetailerList: builder.mutation({
      query: ({ id, status }) => ({
        url: "retailers",
        method: "PATCH",
        body: {
          id,
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
                "getRetailersList",
                undefined,
                (draft) => {
                  const retailer = draft.entities?.[id];
                  if (retailer) {
                    retailer.status = data.status;
                    retailer.url = data.url;
                  }
                }
              )
            );
          } else {
            console.warn("Unexpected API response:", data);
          }
        } catch (err) {
          console.error("Update retailer failed:", err);
          // Optional: Refetch the retailer list to ensure data integrity
          // dispatch(apiSlice.util.invalidateTags([{ type: "retailers", id }]));
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "retailers", id },
      ],
    }),
  }),
});

export const { useUpdateRetailerListMutation } = updateRetailerApiSlice;
