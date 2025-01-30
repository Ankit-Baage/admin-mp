import React from "react";
import { useSelector } from "react-redux";
import { selectAdvertisementState } from "../../store/advertisementFilterSlice";
import {
  selectAdvertisementList,
  useGetAdvertisementListQuery,
} from "../../services/advertisementApiSlice";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import classes from "./advertisementPage.module.css";
import { AdvertisementFilterPage } from "./advertisementFilter/AdvertisementFilterPage";
import { AdvertisementTablePage } from "./advertisementTable/AdvertisementTablePage";
import { selectModuleList, useGetModuleListQuery } from "../../services/modulesApiSlice";
import { selectPageList, useGetPageListQuery } from "../../services/pagesApiSlice";

export const AdvertisementPage = () => {
  const appliedFilters = useSelector(selectAdvertisementState);
   const { isSuccess: moduleSuccess } = useGetModuleListQuery();
    const moduleList = useSelector(selectModuleList);
    const { isSuccess: pageSuccess } = useGetPageListQuery();
    const pageList = useSelector(selectPageList);

  const { isSuccess } = useGetAdvertisementListQuery(appliedFilters);
  const tableData = useSelector(selectAdvertisementList);
  return isSuccess ? (
    <div className={classes.box}>
      <AdvertisementFilterPage filters ={appliedFilters} moduleList={moduleList} pageList={pageList}/>
      <AdvertisementTablePage data={tableData} moduleList={moduleList} pageList={pageList}/>
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
