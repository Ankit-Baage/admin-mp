import React, { useEffect, useState } from "react";
import classes from "./fileUploadInput.module.css";
import { uploadImageRequest } from "../../http-request/uploadImageRequest";


export const FileUploadInput = ({ urlWithExt, url, onSelection }) => {
  const [uploadImage, setUploadImage] = useState("");

  useEffect(() => {
    setUploadImage(url);
    console.log(uploadImage);
  }, [uploadImage, url]);

  const fileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      setUploadImage(imageUrl);
      console.log(imageUrl);
      onSelection(imageUrl)
    } catch (error) {
      console.error(`Upload failed for :`, error);
    }
  };

  return (
    <div className={classes.form__group}>
      <h3 className={classes.form__field__upload__title}>"Upload File</h3>
      <div className={classes.form__group__upload}>
        <label htmlFor="url" className={classes.form__field__upload__label}>
          <input
            name="url"
            type="file"
            id="url"
            className={classes.form__field__upload}
            onChange={fileUpload}
          />
        </label>
        <span className={classes.uploadedUrl}>{urlWithExt}</span>
      </div>
    </div>
  );
};
