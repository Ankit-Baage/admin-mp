import React from "react";
import { useSelector } from "react-redux";


import { CategoryPageSkeleton } from "../../../component/skeleton/CategoryPageSkeleton";

import {
  selectMastersVrpList,
  useGetMastersVrpListQuery,
} from "../../../services/mastersVrpApiSlice";
import { MastersVrpTablePage } from "../mastersTable/MastersVrpTablePage";
import classes from "./masterVrpPage.module.css";
import { MastersVrpFilterPage } from "./mastersVrpFilter/MastersVrpFilterPage";
import { selectMastersVrpState } from "../../../store/mastersVrpFiltersSlice";

export const MasterVrpPage = () => {
  const masterVrpFilters = useSelector(selectMastersVrpState);
  const { isLoading, isSuccess, error } = useGetMastersVrpListQuery(masterVrpFilters);
  const tableData = useSelector(selectMastersVrpList);

  console.log(isSuccess ? tableData : null);

  return isSuccess ? (
    <div className={classes.box}>
      <MastersVrpFilterPage filters={masterVrpFilters}/>
      <MastersVrpTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
