import React, { useEffect, useState } from "react";
import classes from "./retailerFilterPage.module.css";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRetailerFilter } from "../../../store/retailerFilterSlice";
import { PaymentCustomSelect } from "../../../component/paymentCustomSelect/PaymentCustomSelect";

const optionData = [
  { id: 1, label: "Incomplete" },
  { id: 2, label: "Pending for verification" },
  { id: 3, label: "Verified" },
  { id: 4, label: "Rejected" },
];

export const RetailersFilterPage = ({ filters }) => {
  const [appliedFilter, setAppliedFilter] = useState({
    status: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const statusParam = searchParams.get("status");

    setAppliedFilter((prevFilters) => ({
      ...prevFilters,
      status: statusParam || null,
    }));
    dispatch(setRetailerFilter({ status: statusParam }));
  }, [dispatch, searchParams]);

   const handleSelection = (selectedOptionId) => {
      setAppliedFilter((prevFilters) => ({
        ...prevFilters,
        status: selectedOptionId || null,
      }));
      const newSearchParams = new URLSearchParams(searchParams);
      if (selectedOptionId) {
        newSearchParams.set("status", selectedOptionId);
      } else {
        newSearchParams.delete("status");
      }
      setSearchParams(newSearchParams);
      dispatch(setRetailerFilter({ status: appliedFilter.status }));
    };
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <SearchInput placeholder="Search orders..." />
      </div>

      <div className={classes.box__content}>
        <PaymentCustomSelect
          label="Approval Status"
          optionData={optionData}
          onChange={(selectedOptionId) => handleSelection(selectedOptionId)}
          selectOptionId={filters.status}
        />
      </div>
    </div>
  );
};
