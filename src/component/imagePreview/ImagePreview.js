import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  closeImage,
  selectImagePreviewState,
} from "../../store/imagePreviewSlice";
import dummyImage from "../../assets/spare_preview_not_available.svg"
import classes from "./imagePreview.module.css";

export const ImagePreview = () => {
  const dispatch = useDispatch();
  const { isOpen, url } = useSelector(selectImagePreviewState);

  const handleClose = () => {
    dispatch(closeImage());
  };
  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };
  return isOpen ? (
    <motion.div
      onClick={handleClose}
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <span className={classes.box__btn} onClick={handleClose}></span>
        <img src={url} alt="advertisement" className={classes.box__img} onError={handleImageError} />
      </motion.div>
    </motion.div>
  ) : null;
};
