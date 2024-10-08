import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import classes from "./advertisementFilterPage.module.css";
import {
  selectModuleList,
  useGetModuleListQuery,
} from "../../../services/modulesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPageList,
  useGetPageListQuery,
} from "../../../services/pagesApiSlice";
import {
  selectAdvertisementState,
  setAdvertisementFilters,
} from "../../../store/advertisementFilterSlice";

import { AdvertisementFilterSelect } from "../../../component/advertisementFilterSelect/AdvertisementFilterSelect";
import { onOpen } from "../../../store/advertisementActionModalSlice";


export const AdvertisementFilterPage = () => {
  const [appliedFilters, setAppliedFilters] = useState({
    category: null,
    page: null,
  });
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const advertisementFilter = useSelector(selectAdvertisementState);
  const { isSuccess: moduleSuccess } = useGetModuleListQuery();
  const moduleList = useSelector(selectModuleList);
  const { isSuccess: pageSuccess } = useGetPageListQuery();
  const pageList = useSelector(selectPageList);

  const handleSelection = (identifier, option) => {
    const updatedFilters = {
      ...appliedFilters,
      [identifier === "category" ? "category" : "page"]:
        option === "" ? null : option,
    };
    console.log(identifier, option);

    setAppliedFilters(updatedFilters);
  };

  const handleApply = () => {
    const { category, page } = appliedFilters;

    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }

    if (page) {
      searchParams.set("page", page);
    } else {
      searchParams.delete("page");
    }
    console.log(appliedFilters);

    setSearchParams(searchParams);
    dispatch(setAdvertisementFilters(appliedFilters));
  };
  const handleAdd = () => {
    dispatch(
      onOpen({
        action :"Add",
        category: "",
        categoryLabel: "",
        page: "",
        url: "",
        media_type: "",
        urlLabel: "",
      })
    );
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");
    const newFilters = {
      category: categoryParam || null,
      page: pageParam || null,
    };
    setAppliedFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    dispatch(setAdvertisementFilters(newFilters));
  }, [dispatch, searchParams]);

  return (
    <div className={classes.box}>
      <div className={classes.box__filter}>
        <AdvertisementFilterSelect
          optionData={moduleList}
          label="Module"
          selectedId={advertisementFilter.category}
          onChange={(itemId) => handleSelection("category", itemId)}
        />
        <AdvertisementFilterSelect
          optionData={pageList}
          label="Page"
          selectedId={advertisementFilter.page}
          onChange={(itemId) => handleSelection("page", itemId)}
        />
      </div>
      <div className={classes.box__btns}>
        <button className={classes.box__btns__btn} onClick={handleApply}>
          Apply
        </button>
        <button className={classes.box__btns__btn__add} onClick={handleAdd}>
          Add Advertisement
        </button>
      </div>
    </div>
  );
};
