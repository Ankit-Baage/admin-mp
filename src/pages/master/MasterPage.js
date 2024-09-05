import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectMastersState,
  setCategory,
} from "../../store/mastersFiltersSlice";
import {
  selectMastersList,
  useGetMastersListQuery,
} from "../../services/mastersApiSlice";
import {MastersTablePage} from "./mastersTable/MastersTablePage"
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import classes from "./masterPage.module.css";

export const MasterPage = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const category = params.category;
  const appliedFilters = useSelector(selectMastersState);
  const { isLoading, isSuccess, error } = useGetMastersListQuery(appliedFilters,
    {
      skip: !appliedFilters.category,
    });
  const tableData = useSelector(selectMastersList);

  console.log(isSuccess ? tableData : null);

  useEffect(() => {
    dispatch(setCategory({ category }));
  }, [category, dispatch]);

  return isSuccess ? (
    <div className={classes.box}>
      <MastersTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
