import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectMastersList, useGetMastersListQuery } from "../../../services/mastersApiSlice";



import { MastersFiltersPage } from "../mastersFilter/MastersFilterPage";
import { CategoryPageSkeleton } from "../../../component/skeleton/CategoryPageSkeleton";
import { MastersTablePage } from "../mastersTable/MastersTablePage";
import {
  selectMastersCategoryFilterState,
  setCategory,
} from "../../../store/mastersCategoryFilterSlice";
import classes from "./mastersCategoryPage.module.css";
import { setVariantCategory } from "../../../store/mastersVariantFilterSlice";

export const MastersCategoryPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;

  const masterCategoryState = useSelector(selectMastersCategoryFilterState);
  const { isLoading, isSuccess, error } = useGetMastersListQuery(
    masterCategoryState,
    {
      skip: !masterCategoryState.category,
    }
  );
  const tableData = useSelector(selectMastersList);

  useEffect(() => {
    dispatch(setCategory({ category }));
  }, [category, dispatch]);

  return isSuccess ? (
    <div className={classes.box}>
      <MastersFiltersPage />
      <MastersTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
