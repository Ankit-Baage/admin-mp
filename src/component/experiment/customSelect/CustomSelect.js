import React, { useState } from "react";
import classes from "./customSelect.module.css";

export const CustomSelect = ({
  optionData,
  label,
}) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
  };

  return (
    <select
      className={classes.box}
      onChange={handleChange}
      value={currentSelection || ""}
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
          {option.label}
        </option>
      ))}
    </select>
  );
};
