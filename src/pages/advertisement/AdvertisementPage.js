import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdvertisementState } from "../../store/advertisementFilterSlice";
import {
  selectAdvertisementList,
  useGetAdvertisementListQuery,
} from "../../services/advertisementApiSlice";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import classes from "./advertisementPage.module.css";
import { AdvertisementFilterPage } from "./advertisementFilter/AdvertisementFilterPage";
import { AdvertisementTablePage } from "./advertisementTable/AdvertisementTablePage";

export const AdvertisementPage = () => {
  const appliedFilters = useSelector(selectAdvertisementState);

  const { isSuccess } = useGetAdvertisementListQuery(appliedFilters);
  const tableData = useSelector(selectAdvertisementList);
  console.log(tableData);
  return isSuccess ? (
    <div className={classes.box}>
      <AdvertisementFilterPage />
      <AdvertisementTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
