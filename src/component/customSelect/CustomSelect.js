import React, { useEffect, useState } from "react";
import classes from "./customSelect.module.css";
import { useSelector } from "react-redux";
import { selectCategoryState } from "../../store/categorySlice";

export const CustomSelect = ({
  optionData,
  onSelection,
  selectedId,
  label,
}) => {
  const category = useSelector(selectCategoryState);
  const [currentSelection, setCurrentSelection] = useState(selectedId);

  useEffect(() => {
    setCurrentSelection(selectedId);
  }, [selectedId, category.category]);

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    onSelection(label, optionId);
  };

  return (
    <select
      className={classes.box}
      onChange={handleChange}
      value={currentSelection || ""}
    >
      <option value="" className={classes.box__option}>
        Select {label}
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
