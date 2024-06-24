import React from "react";
import classes from "./customSelect.module.css";

export const CustomSelect = ({ItemId, sellerOptions}) => {

  console.log(sellerOptions)
  const handleChange = (sellerId) => {
    // onItemSelected(sellerId);
    console.log(sellerId);
  };
  const options = [{ id: 1, seller: "Ankit" }];
  return (
    <select
      className={classes.box}
      onChange={(event) => handleChange(event.target.value)}
      value={ItemId}
    >
      <option value="" className={classes.box__option}>
        Select all sellers
      </option>
      {sellerOptions.map((option) => (
        <option
          key={option.id}
          value={option.id}
          className={classes.box__option}
        >
          {option.seller}
        </option>
      ))}
    </select>
  );
};
