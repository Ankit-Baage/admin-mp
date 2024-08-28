import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const advertisementListAdapter = createEntityAdapter({
  selectId: (advertisement) => advertisement.id,
});

const initialState = advertisementListAdapter.getInitialState();

export const advertisementListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvertisementList: builder.query({
      query: ({ category, page }) => {
        let queryString = "advertisement";
        if (category) {
          queryString += `?category=${category}`;
          if (page) {
            queryString += `&page=${page}`;
          }
        } else if (page) {
          queryString += `?page=${page}`;
        }
        return queryString;
      },
      transformResponse: (responseData) => {
        const loadedAdvertisementList = responseData.data.map((item) => {
          // Add categoryLabel based on category
          let categoryLabel = "";
          switch (item.category) {
            case "spares":
              categoryLabel = "SPARES";
              break;
            case "vrp":
              categoryLabel = "VRP";
              break;
            case "prexo":
              categoryLabel = "PREXO";
              break;
            case "open_box":
              categoryLabel = "OPEN BOX";
              break;
            case "new_phones":
              categoryLabel = "NEW PHONE";
              break;
              case "home":
                categoryLabel = "HOME";
                break;
            default:
              categoryLabel = "UNKNOWN";
              break;
          }

          // Extract urlLabel from the URL
          const urlParts = item.url.split("/");
          const urlLabelWithExt = urlParts[urlParts.length - 1];

          // If you want to remove the extension and get the base name

          return {
            ...item,
            categoryLabel,
            urlLabel: urlLabelWithExt,
          };
        });

        console.log(loadedAdvertisementList);
        return advertisementListAdapter.setAll(
          initialState,
          loadedAdvertisementList
        );
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [{ type: "advertisement", id: "advertisementList" }];
        }
        return [
          { type: "advertisement", id: "advertisementList" },
          ...result.ids.map((id) => ({ type: "advertisement", id })),
        ];
      },
    }),
  }),
});

export const { useGetAdvertisementListQuery } = advertisementListSlice;

const advertisementFilter = (state) => state.advertisementFilter;

const selectCategoryListResult = createSelector(
  [advertisementFilter, (state) => state],
  (filter, state) => {
    const result = advertisementListSlice.endpoints.getAdvertisementList.select(
      {
        category: filter.category,
        page: filter.page,
      }
    )(state);
    return result;
  }
);

const selectAdvertisementListData = createSelector(
  [selectCategoryListResult],
  (advertisementListResult) => advertisementListResult?.data ?? initialState
);

export const {
  selectAll: selectAdvertisementList,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = advertisementListAdapter.getSelectors((state) => {
  const data = selectAdvertisementListData(state);
  return data;
});
