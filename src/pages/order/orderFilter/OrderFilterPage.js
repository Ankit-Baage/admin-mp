import React from "react";
import classes from "./orderFilterPage.module.css";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";

export const OrderFilterPage = () => {
  const optionData = [
    { id: 1, itemLabel: "vrp" },
    { id: 2, itemLabel: "spares" },
    { id: 3, itemLabel: "prexo" },
  ];
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <SearchInput placeholder="Search orders..." />
      </div>

      <div className={classes.box__content}>
        <CustomSelect label="orders" optionData={optionData} />
      </div>
    </div>
  );
};
