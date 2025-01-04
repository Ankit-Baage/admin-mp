import React, { useEffect, useState } from "react";
import classes from "./orderCustomSelect.module.css";

export const OrderCustomSelect = ({
  id,
  optionData,
  onChange,
  selectedId,
  label,
  register,
}) => {
  const [currentSelection, setCurrentSelection] = useState(selectedId || "");

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    // onChange(optionId);
  };
  useEffect(() => {
    setCurrentSelection(selectedId || "");
  }, [selectedId]);
  return (
    <select
      {...register(id)}
      value={currentSelection}
      onChange={(e) => {
        handleChange(e); // Custom change handler
      }}
      className={classes.box}
      required
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
};
