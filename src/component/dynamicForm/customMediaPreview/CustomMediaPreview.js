import React from "react";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./customMediaPreview.module.css";

export const CustomMediaPreview = ({ label, media_type, url, urlWithExt }) => {
 
  const handleMediaError = (e) => {
    e.target.src = dummyImage;
  };
  return (
    <div className={classes.box}>
      <h3 className={classes.box__title}>{label}-View</h3>
      <div className={classes.box__content}>
        <img
          src={url || dummyImage}
          alt="upload"
          className={classes.box__img}
          onError={handleMediaError}
        />
        <span className={classes.box__url}>{urlWithExt}</span>
      </div>
    </div>
  );
};
