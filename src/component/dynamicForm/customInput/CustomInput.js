import React from "react";
import classes from "./customInput.module.css";

export const CustomInput = ({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  validation,
}) => {
  return (
    <div className={classes.box}>
      <input
        type={type}
        id={id}
        className={classes.box__input}
        placeholder={placeholder}
        {...register(id, validation)}
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.box__label}>
        {label || placeholder}
      </label>
    </div>
  );
};
