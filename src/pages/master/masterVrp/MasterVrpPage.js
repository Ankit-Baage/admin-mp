import React from "react";
import { useSelector } from "react-redux";
import { selectMastersState, selectMastersVrpState } from "../../../store/mastersVrpFiltersSlice";

import { CategoryPageSkeleton } from "../../../component/skeleton/CategoryPageSkeleton";
import { MastersVrpSearchPage } from "../mastersFilter/MastersVrpSearchPage";
import {
  selectMastersVrpList,
  useGetMastersVrpListQuery,
} from "../../../services/mastersVrpApiSlice";
import { MastersVrpTablePage } from "../mastersTable/MastersVrpTablePage";
import classes from "./masterVrpPage.module.css";

export const MasterVrpPage = () => {
  const masterVrpState = useSelector(selectMastersVrpState);
  const { isLoading, isSuccess, error } = useGetMastersVrpListQuery({
    vrp_no: masterVrpState.vrp_no,
  });
  const tableData = useSelector(selectMastersVrpList);

  console.log(isSuccess ? tableData : null);

  return isSuccess ? (
    <div className={classes.box}>
      <MastersVrpSearchPage />
      <MastersVrpTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
