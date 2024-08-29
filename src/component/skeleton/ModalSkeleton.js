import React from "react";
import classes from "./modalSkeleton.module.css ";

export const ModalSkeleton = () => {
  return (
    <div className={classes.box}>
      <select disabled className={classes.box__select}></select>
      <select disabled className={classes.box__select}></select>
      <select disabled className={classes.box__select}></select>
      <select disabled className={classes.box__select}></select>
    </div>
  );
};
