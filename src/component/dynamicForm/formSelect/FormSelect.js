import React from "react";
import classes from "./formSelect.module.css";

export const FormSelect = ({
  options,
  onChange,
  value,
  label,
  register,
  id,
  validation,
  disabled
}) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;

    onChange?.(selectedValue);
  };

  return (
    <div className={classes.box}>
      <select
        className={classes.box__select}
        onChange={handleChange}
        value={value}
        {...(register ? register(id, validation) : {})}
        disabled={disabled}
      >
        <option value="" className={classes.box__select__option}>
          {label}
        </option>
        {options?.map((option) => (
          <option
            key={option.id}
            value={option.id }
            className={classes.box__select__option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
