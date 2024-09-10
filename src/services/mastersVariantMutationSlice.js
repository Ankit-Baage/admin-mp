import { apiSlice } from "./apiSlice";

export const mastersVariantMutationsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add Variant Mutation
    addVariant: builder.mutation({
      query: ({ category, brand, model, part_name, color, price, original_price }) => ({
        url: `masters/${category}`,
        method: "POST",
        body: { brand, model, part_name, color, price, original_price },
      }),
      onQueryStarted: async (
        { category, brand, model, part_name, color, price, original_price },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getMastersVariantList",
              undefined,
              (draft) => {
                draft.entities[data.id] = data;
              }
            )
          );
        } catch (err) {
          console.error("Add variant failed:", err);
        }
      },
      invalidatesTags: (result, error, { category }) => [
        { type: `mastersvariant${category}` },
      ],
    }),

    // Update Variant Mutation
    updateVariant: builder.mutation({
      query: ({ id, category, brand, model, part_name, color, price, original_price }) => ({
        url: `masters/${category}`,
        method: "PUT",
        body: { id, brand, model, part_name, color, price, original_price },
      }),
      onQueryStarted: async (
        { id, category, brand, model, part_name, color, price, original_price },
        { dispatch, queryFulfilled }
      ) => {
        // Optimistically update the cache
        dispatch(
          apiSlice.util.updateQueryData(
            "getMastersVariantList",
            undefined,
            (draft) => {
              const variant = draft.entities[id];
              if (variant) {
                variant.part_name = part_name;
                variant.color = color;
                variant.price = price;
                variant.original_price = original_price;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Update variant failed:", err);
        }
      },
      invalidatesTags: (result, error, { id, category }) => [
        { type: `mastersvariant${category}`, id },
      ],
    }),

    // Delete Variant Mutation
    deleteVariant: builder.mutation({
      query: ({ id, category }) => ({
        url: `masters/${category}?id=${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        // Optimistically remove the item from cache
        dispatch(
          apiSlice.util.updateQueryData(
            "getMastersVariantList",
            undefined,
            (draft) => {
              delete draft.entities[id];
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Delete variant failed:", err);
        }
      },
      invalidatesTags: (result, error, { id, category }) => [
        { type: `mastersvariant${category}`, id },
      ],
    }),
  }),
});

export const {
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = mastersVariantMutationsSlice;
