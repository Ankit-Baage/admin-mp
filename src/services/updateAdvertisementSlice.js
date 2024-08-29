import { apiSlice } from "./apiSlice";

export const advertisementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAdvertisementList: builder.mutation({
      query: ({ id, sequence, category, page, url, mediaType }) => ({
        url: `advertisement`,
        method: "PUT",
        body: {
          id,
          sequence,
          category,
          page,
          url,
          mediaType,
        },
      }),
      onQueryStarted: async (
        { id, sequence },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAdvertisementList",
              undefined,
              (draft) => {
                const advertisement = draft.entities[id];
                if (advertisement) {
                  advertisement.sequence = sequence;
                  advertisement.category = data.category;
                  advertisement.page = data.page;
                  advertisement.url = data.url;
                  advertisement.mediaType = data.mediaType;
                }
              }
            )
          );
        } catch (err) {
          console.error("Update advertisement failed:", err);
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "advertisement", id },
      ],
    }),
    deleteAdvertisementList: builder.mutation({
      query: ({ id }) => ({
        url: `advertisement?id=${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAdvertisementList",
              undefined,
              (draft) => {
                draft.entities[id] = undefined;
              }
            )
          );
        } catch (err) {
          console.error("Delete advertisement failed:", err);
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "advertisement", id },
      ],
    }),
    addAdvertisement: builder.mutation({
      query: ({ sequence, category, page, url, mediaType }) => ({
        url: `advertisement`,
        method: "POST",
        body: {
          sequence,
          category,
          page,
          url,
          mediaType,
        },
      }),
      onQueryStarted: async (
        { sequence, category, page, url, mediaType },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAdvertisementList",
              undefined,
              (draft) => {
                draft.entities[data.id] = data;
              }
            )
          );
        } catch (err) {
          console.error("Add advertisement failed:", err);
        }
      },
      invalidatesTags: ["advertisement"],
    }),
  }),
});

export const {
  useUpdateAdvertisementListMutation,
  useDeleteAdvertisementListMutation,
  useAddAdvertisementMutation,
} = advertisementSlice;
