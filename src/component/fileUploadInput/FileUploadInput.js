import React, { useState } from "react";
import classes from "./fileUploadInput.module.css";
import { uploadImageRequest } from "../../http-request/uploadImageRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdvertisementActionModalState,
  updateUrlAndLabel,
} from "../../store/advertisementActionModalSlice";

export const FileUploadInput = ({ id, label, urlWithExt, onChange }) => {
  const { modalData } = useSelector(selectAdvertisementActionModalState);
  const dispatch = useDispatch();

  const fileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      onChange(imageUrl);
      const urlParts = imageUrl.split("/");
      const urlLabelWithExt = urlParts[urlParts.length - 1];
      dispatch(updateUrlAndLabel({ url: imageUrl, urlLabel: urlLabelWithExt }));
    } catch (error) {
      console.error(`Upload failed for :`, error);
    }
  };

  return (
    <div className={classes.form__group}>
      <h3 className={classes.form__field__upload__title}>{label}</h3>
      <div className={classes.form__group__upload}>
        <label htmlFor={id} className={classes.form__field__upload__label}>
          <input
            type="file"
            id={id}
            className={classes.form__field__upload}
            onChange={fileUpload}
          />
        </label>

        <span className={classes.uploadedUrl}>{urlWithExt}</span>
      </div>
    </div>
  );
};
