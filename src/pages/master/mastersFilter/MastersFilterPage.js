import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { useSearchParams } from "react-router-dom";

import { selectBrandList, useGetBrandListQuery } from "../../../services/brandApiSlice";
import { selectModelList, useGetModelListQuery } from "../../../services/modelApiSlice";
import classes from "./mastersFilterPage.module.css";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";
import { selectMastersCategoryFilterState, setFilters } from "../../../store/mastersCategoryFilterSlice";


export const MastersFiltersPage = () => {
  const [appliedFilters, setAppliedFilters] = useState({
    identifier: null,
    brand: null,
    model: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const masterCategoryState = useSelector(selectMastersCategoryFilterState);
  const { isSuccess } = useGetBrandListQuery(
    { category: masterCategoryState.category },
    { skip: !masterCategoryState.category }
  );
  const brandList = useSelector(selectBrandList);

  const { isSuccess: isModelSuccess } = useGetModelListQuery(
    { category: masterCategoryState.category },
    { skip: !masterCategoryState.category }
  );
  const modelList = useSelector(selectModelList);


  const handleSelection = (identifier, option) => {
    const updatedFilters = {
      ...appliedFilters,
      [identifier === "brand" ? "brand" : "model"]:
        option === "" ? null : option,
    };

    setAppliedFilters(updatedFilters);
  };

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const modelParam = searchParams.get("model");
    const newFilters = {
      brand: brandParam || null,
      model: modelParam || null,
    };
    setAppliedFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    dispatch(setFilters(newFilters));
  }, [dispatch, searchParams]);

  const handleApply = () => {
    const { brand, model } = appliedFilters;

    if (brand) {
      searchParams.set("brand", brand);
    } else {
      searchParams.delete("brand");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    setSearchParams(searchParams);
    dispatch(setFilters(appliedFilters));
  };

  return (
    <div className={classes.box}>
      <CustomSelect
        optionData={brandList}
        label="brand"
        onSelection={(identifier, option) => {
          handleSelection(identifier, option);
        }}
        selectedId={masterCategoryState.brand || ""}
      />
      <CustomSelect
        optionData={modelList}
        label="model"
        onSelection={(identifier, option) => {
          handleSelection(identifier, option);
        }}
        selectedId={masterCategoryState.model || ""}
      />
      <button className={classes.box__btn} onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};
