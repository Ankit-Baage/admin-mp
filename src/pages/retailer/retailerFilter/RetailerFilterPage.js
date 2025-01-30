import React, { useEffect } from "react";
import classes from "./retailerFilterPage.module.css";
import { SearchInput } from "../../../component/searchInput/SearchInput";

import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRetailerFilter } from "../../../store/retailerFilterSlice";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";

const optionData = [
  { id: 1, label: "Incomplete" },
  { id: 2, label: "Pending for verification" },
  { id: 3, label: "Verified" },
  { id: 4, label: "Rejected" },
];

export const RetailersFilterPage = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    if (filters.status !== statusParam || filters.search !== searchParam) {
      dispatch(
        setRetailerFilter({
          status: statusParam || null,
          search: searchParam || null,
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
    dispatch(setRetailerFilter({ [key]: value || null }));
  };

  const handleSelection = (identifier, selectedOptionId) => {
    updateFilterParams(identifier, selectedOptionId);
  };

  const handleSearch = (searchText) => {
    updateFilterParams("search", searchText);
  };

  const handleClearText = () => {
    // Remove "search" from URL params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    setSearchParams(newSearchParams);

    // Reset "search" in the Redux store
    dispatch(setRetailerFilter({ search: null }));
  };

  return (
    <div className={classes.box}>
      {/* Search Input */}
      <div className={classes.box__content}>
        <SearchInput
          placeholder="Search by Name or Phone No."
          onSearch={handleSearch}
          searchTextFrmStore={filters.search}
          searchFilter={filters.search != null}
          onClear={handleClearText}
        />
      </div>

      {/* Custom Select Dropdown */}
      <div className={classes.box__content}>
        <CustomSelect
          name="status"
          label="Select All"
          options={optionData}
          onSelection={handleSelection}
          selectedId={filters.status || ""}
        />
      </div>
    </div>
  );
};
