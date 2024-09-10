import React, { useCallback, useEffect } from "react";
import classes from "./mastersVariantPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  clearVariantFilters,
  selectMastersVariantState,
  setVariantFilters,
} from "../../../store/mastersVariantFilterSlice";
import {
  selectMastersVariantList,
  useGetMastersVariantListQuery,
} from "../../../services/mastersCategoryVariantSlice";

import { MastersVariantTablePage } from "./masterVariantTable/MasterVariantTablePage";
import { onOpen } from "../../../store/variantModalSlice";

export const MastersVariantPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const masterVariantState = useSelector(selectMastersVariantState);
  

  const params = useParams();
  const category = params.category;
  const queryParams = new URLSearchParams(location.search);
  const brand = queryParams.get("brand");
  const model = queryParams.get("model");

  const hasRequiredFilters =
    masterVariantState.category &&
    masterVariantState.brand &&
    masterVariantState.model;

  const { data, isLoading, isSuccess, error } = useGetMastersVariantListQuery(
    masterVariantState,
    { skip: !hasRequiredFilters }
  );

  useEffect(() => {
    if (category && brand && model) {
      dispatch(
        setVariantFilters({
          category,
          brand,
          model,
        })
      );
    }
    return () => {
      dispatch(clearVariantFilters());
    };
  }, [brand, model, dispatch, category]);

  const tableData = useSelector(selectMastersVariantList);
  console.log(data?.ids.length);

  const handleAdd = () => {
    dispatch(
      onOpen({
        action: "Add",
        brand:"",
        model:"",
        ram: "",
        rom: "",
        color: "",
      })
    );
  };

  return (
    <div className={classes.box}>
      <div className={classes.head}>
        <div className={classes.head__brand}>
          <h3 className={classes.head__brand__title}>
            {masterVariantState?.brand}
          </h3>
        </div>
        <div className={classes.head__brand}>
          <h3 className={classes.head__brand__title}>
            {masterVariantState?.model}
          </h3>
        </div>

        <div className={classes.head__variant}>
          <h3 className={classes.head__variant__title}>Variant Count :</h3>
          <h3 className={classes.head__variant__title__value}>
            {data?.ids.length}
          </h3>
        </div>
        <button className={classes.head__btn} onClick={handleAdd}>
          Add
        </button>
      </div>
      <MastersVariantTablePage data={tableData} />
    </div>
  );
};
