import React from "react";
import { useSelector } from "react-redux";
import {
  selectRetailers,
  useGetRetailersListQuery,
} from "../../services/retailersApiSlice";
import classes from "./retailerPage.module.css";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import { SearchInput } from "../../component/searchInput/SearchInput";
import { RetailerTablePage } from "./retailerTable/RetailerTablePage";
import { RetailersFilterPage } from "./retailerFilter/RetailerFilterPage";
import { selectRetailerState } from "../../store/retailerFilterSlice";

export const RetailerPage = () => {
  const appliedFilters = useSelector(selectRetailerState);
  const { data, isSuccess } = useGetRetailersListQuery(appliedFilters);

  const tableData = useSelector(selectRetailers);

  return isSuccess ? (
    <div className={classes.box}>
      <RetailersFilterPage filters={appliedFilters} />
      <RetailerTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
