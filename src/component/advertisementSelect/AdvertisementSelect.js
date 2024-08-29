import React, { useEffect, useState } from "react";

import classes from "./advertisementSelect.module.css";

export const AdvertisementCustomSelect = ({
  optionData,
  onChange,
  selectedId,
  label,
}) => {
  const [currentSelection, setCurrentSelection] = useState(selectedId || "");

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    onChange(optionId);
  };
  useEffect(() => {
    setCurrentSelection(selectedId || "");
  }, [selectedId]);

  return (
    <select
      className={classes.box}
      onChange={handleChange}
      value={currentSelection}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
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
