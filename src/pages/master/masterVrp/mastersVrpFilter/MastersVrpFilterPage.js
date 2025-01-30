import React, { useEffect } from "react";
import { SearchInput } from "../../../../component/searchInput/SearchInput";
import { useDispatch } from "react-redux";
import { onOpen } from "../../../../store/mastersVrpActionModalSlice";
import classes from "./mastersVrpFilterPage.module.css";
import { useSearchParams } from "react-router-dom";
import {
  clearFilters,
  setFilters,
} from "../../../../store/mastersVrpFiltersSlice";

export const MastersVrpFilterPage = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handleOpenModal = (action) => {
    console.log(action);
    dispatch(
      onOpen({
        id: null,
        action: action,
        brand: null,
        model: null,
        ram: null,
        rom: null,
        color: null,
        modifiedBrand: null,
        modifiedModel: null,
        modifiedRam: null,
        modifiedRom: null,
        modifiedColor: null,
      })
    );
  };

  useEffect(() => {
    const vrp_noParam = searchParams.get("vrp_no");

    if (filters.vrp_no !== vrp_noParam) {
      dispatch(
        setFilters({
          vrp_no: vrp_noParam || null,
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
    dispatch(setFilters({ [key]: value || null }));
  };
  const handleSearch = (searchText) => {
    updateFilterParams("vrp_no", searchText);
  };

  const handleClearText = () => {
    // Remove "search" from URL params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("vrp_no");
    setSearchParams(newSearchParams);

    // Reset "search" in the Redux store
    dispatch(clearFilters());
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <SearchInput
          placeholder="Search By VRP No."
          onSearch={handleSearch}
          searchTextFrmStore={filters.vrp_no}
          searchFilter={filters.vrp_no != null}
          onClear={handleClearText}
        />
      </div>

      <button
        className={classes.box__btn}
        onClick={() => handleOpenModal("Add")}
      >
        Add
      </button>
    </div>
  );
};
