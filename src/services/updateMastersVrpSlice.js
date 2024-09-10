import { apiSlice } from "./apiSlice";

export const mastersVrpSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    approveMasterVrp: builder.mutation({
      query: ({ id }) => ({
        url: `masters/vrp`,
        method: "PATCH",
        body: {
          id,
          status: 2, // Status 2 for approve
        },
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {  // Removed category
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getMastersVrpList",
              undefined, // No category needed
              (draft) => {
                const masterItem = draft.entities[id];
                if (masterItem) {
                  masterItem.status = data.status;
                }
              }
            )
          );
        } catch (err) {
          console.error("Approval failed:", err);
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "mastersvrp", id: "mastersvrp" },  // Invalidate the entire list
        { type: "mastersvrp", id },                // Invalidate the specific master by ID
      ],
    }),
    rejectMasterVrp: builder.mutation({
      query: ({ id }) => ({
        url: `masters/vrp`,
        method: "PATCH",
        body: {
          id,
          status: 1, // Status 1 for reject (delete)
        },
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {  // Removed category
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getMastersVrpList",
              undefined, // No category needed
              (draft) => {
                const masterItem = draft.entities[id];
                if (masterItem) {
                  masterItem.status = data.status;
                }
              }
            )
          );
        } catch (err) {
          console.error("Rejection failed:", err);
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "mastersvrp", id: "mastersvrp" },  // Invalidate the entire list
        { type: "mastersvrp", id },                // Invalidate the specific master by ID
      ],
    }),
    addMasterVrp: builder.mutation({
      query: ({ brand, model, ram, rom, color }) => ({
        url: `masters/vrp`,
        method: "POST",
        body: {
          brand,
          model,
          ram,
          rom,
          color,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {  // Removed category
        try {
          const { data } = await queryFulfilled;
          // Optionally update the cached list after adding a new master
          dispatch(
            apiSlice.util.updateQueryData(
              "getMastersVrpList",
              undefined, // Ensure no category param here
              (draft) => {
                draft.entities[data.id] = data; // Add the new master to the cache
              }
            )
          );
        } catch (err) {
          console.error("Add Master failed:", err);
        }
      },
      invalidatesTags: (result, error) => [
        { type: "mastersvrp", id: "mastersvrp" },  // Invalidate the entire list
      ],
    }),
  }),
});

export const {
  useApproveMasterVrpMutation,
  useRejectMasterVrpMutation,
  useAddMasterVrpMutation,  
} = mastersVrpSlice;
