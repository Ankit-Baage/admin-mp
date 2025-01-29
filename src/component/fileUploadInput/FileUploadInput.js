import React, { useEffect, useState } from "react";
import { uploadImageRequest } from "../../http-request/uploadImageRequest";

import uploadIcon from "../../assets/upload-icon.svg";
import classes from "./fileUploadInput.module.css";

const extractReadableLabel = (url) => {
  if (url) {
    const urlParts = url.split("/");
    const fileNameWithExt = urlParts[urlParts.length - 1]; // Get the last part of the URL
    const shortFileName = fileNameWithExt.slice(0, 5); // Take first 10 characters
    const fileExtension = fileNameWithExt.split(".").pop(); // Get file extension (e.g., png)
    return `${shortFileName}...${fileExtension}`; // Add "..." and the extension at the end
  }
  return ""; // Return an empty string if URL is null
};

export const FileUploadInput = ({ id, urlWithExt, url, onSelection, onChange }) => {
  const [uploadImage, setUploadImage] = useState("");
  const [ext, setExt] = useState("")

  // Sync `uploadImage` state with the `url` prop
  useEffect(() => {
    if (url) {
      setUploadImage(url);
    }
  }, [url]);

  const fileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    try {
      // Upload the selected file using the provided request function
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      const showUrl = extractReadableLabel(imageUrl)

      // Update the local state and trigger callbacks
      setUploadImage(imageUrl);
      if (onChange) onChange(id, imageUrl); // Sync with the parent form
      if (onSelection) onSelection(imageUrl); // Optional callback
      setExt(showUrl)
      
    } catch (error) {
      console.error(`File upload failed for ${id}:`, error);
    }
  };

  return (
    <div className={classes.form__group}>
      <h3 className={classes.form__field__upload__title}>Upload File</h3>
      <div className={classes.form__group__upload}>
        <label htmlFor={`upload-${id}`} className={classes.form__field__upload__label}>
          <img src={uploadIcon} alt="upload" className={classes.upload__img} />
          <h3 className={classes.upload__label}>Upload File</h3>
          <input
            name={`upload-${id}`}
            type="file"
            id={`upload-${id}`}
            className={classes.form__field__upload}
            onChange={fileUpload}
            required
          />
        </label>
        <span className={classes.uploadedUrl}>{urlWithExt || ext}</span>
      </div>
    </div>
  );
};
