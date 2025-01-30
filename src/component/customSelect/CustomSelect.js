import React, { useEffect, useState } from "react";
import classes from "./customSelect.module.css";


export const CustomSelect = ({
  options,
  onSelection,
  selectedId,
  label,
  name,
}) => {

  const [currentSelection, setCurrentSelection] = useState(selectedId);

  useEffect(() => {
    setCurrentSelection(selectedId);
  }, [selectedId]);

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    onSelection(name, optionId);
  };

  return (
    <div className={classes.box}>
      <select
        className={classes.box__select}
        onChange={handleChange}
        value={currentSelection || ""}
      >
        <option value="" className={classes.box__select__option}>
          {label}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className={classes.box__select__option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
