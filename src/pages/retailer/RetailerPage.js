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

export const RetailerPage = () => {
  const { data, isSuccess } = useGetRetailersListQuery();

  const tableData = useSelector(selectRetailers);

  return isSuccess ? (
    <div className={classes.box}>
      <RetailersFilterPage />
      <RetailerTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
