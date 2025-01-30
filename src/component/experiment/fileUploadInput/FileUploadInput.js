import React, { useCallback, useEffect, useState } from "react";
import { uploadImageRequest } from "../../../http-request/uploadImageRequest";

import uploadIcon from "../../../assets/upload-icon.svg";
import classes from "./fileUploadInput.module.css";
import { useDispatch } from "react-redux";
import { openMedia } from "../../../store/mediaPreviewSlice";
import dummyImage from "../../../assets/spare_preview_not_available.svg";

export const FileUploadInput = ({
  urlWithExt,
  url,
  onChange,
  label,
  disabled,
}) => {
  const [uploadImage, setUploadImage] = useState("");
  const dispatch = useDispatch();

  const handleOpenView = useCallback(() => {
    dispatch(
      openMedia({
        url: url ? url : dummyImage,
        media_type: "image",
      })
    );
  }, [dispatch, url]);

  useEffect(() => {
    setUploadImage(url);
    console.log(uploadImage);
  }, [uploadImage, url]);

  console.log("url", url);
  const fileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      setUploadImage(imageUrl);
      console.log(imageUrl);
      onChange(imageUrl);
    } catch (error) {
      console.error(`Upload failed for :`, error);
    }
  };

  return (
    <div className={classes.form__group}>
      <h3 className={classes.form__field__upload__title}>{label}</h3>
      <div className={classes.form__group__upload}>
        <label
          htmlFor="url"
          className={classes.form__field__upload__label}
          onClick={handleOpenView}
        >
          <img
            src={url}
            alt="upload"
            className={classes.upload__img}
          />
          <h3 className={classes.upload__label}>View File</h3>
          <input
            name="url"
            type="file"
            id="url"
            className={classes.form__field__upload}
            onChange={fileUpload}
            required
            disabled={disabled}
          />
        </label>
        <span className={classes.uploadedUrl}>{urlWithExt}</span>
      </div>
    </div>
  );
};
