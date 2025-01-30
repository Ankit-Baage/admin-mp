import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";

import { openModal } from "../../../store/modalSlice";

import {
  setAdvertisementFilters,
} from "../../../store/advertisementFilterSlice";

import { onOpen } from "../../../store/advertisementActionModalSlice";

import { CustomSelect } from "../../../component/customSelect/CustomSelect";
import classes from "./advertisementFilterPage.module.css";

export const AdvertisementFilterPage = ({ filters, moduleList, pageList }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");

    if (filters.category !== categoryParam || filters.page !== pageParam) {
      dispatch(
        setAdvertisementFilters({
          category: categoryParam || null,
          page: pageParam || null,
        })
      );
    }
  }, [dispatch, searchParams, filters]);

  const updateFilterParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
    dispatch(setAdvertisementFilters({ [key]: value || null }));
  };

  const handleSelection = (identifier, selectedOptionId) => {
    updateFilterParams(identifier, selectedOptionId);
  };
  const handleOpenModal = useCallback(
    () => {
      // console.log(rowData)
      dispatch(
        openModal({
          component: "DynamicForm",
          uiData: {
            heading: "Add Advertisement",
            primaryButtonLabel: "Add Advertisement",
            isGridRequired: true
          },
          configData: {
            moduleList,
            pageList
          },
          operationType: "Add",
          module: "advertisement"
        })
      );
    },
    [dispatch, moduleList, pageList]
  );

  

  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <CustomSelect
          name="category"
          label="Select Module"
          options={moduleList}
          onSelection={handleSelection}
          selectedId={filters.category || ""}
        />
      </div>
      <div className={classes.box__content}>
        <CustomSelect
          name="page"
          label="Select Page"
          options={pageList}
          onSelection={handleSelection}
          selectedId={filters.page || ""}
        />
      </div>

      <button className={classes.box__btn} onClick={handleOpenModal}>
        Add Advertisement
      </button>
    </div>
  );
};
