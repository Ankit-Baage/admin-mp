import React from "react";
import classes from "./advertisementSelect.module.css";

export const AdvertisementCustomSelect = React.forwardRef(
  ({ optionData, onChange, value, label, name, onBlur }, ref) => {
    return (
      <select
        ref={ref}
        className={classes.box}
        onChange={(event) => onChange(event.target.value)}
        value={value || ""}
        onBlur={onBlur}
        name={name}
      >
        <option value="" className={classes.box__option}>
          {label}
        </option>
        {optionData.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className={classes.box__option}
          >
            {option.itemLabel}
          </option>
        ))}
      </select>
    );
  }
);
