import React from "react";
import classes from "./retailerFilterPage.module.css";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";

export const RetailersFilterPage = () => {
  return (
    <div className={classes.box}>
      <SearchInput placeholder="Enter Vrp Number" />
      {/* <CustomSelect /> */}
      <button className={classes.box__btns__btn__add}>Add</button>
    </div>
  );
};
