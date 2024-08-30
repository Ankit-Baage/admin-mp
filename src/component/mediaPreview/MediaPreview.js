import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  closeMedia,
  selectMediaPreviewState,
} from "../../store/mediaPreviewSlice";
import dummyImage from "../../assets/spare_preview_not_available.svg";
import classes from "./mediaPreview.module.css";

export const MediaPreview = () => {
  const dispatch = useDispatch();
  const { isOpen, url, media_type } = useSelector(selectMediaPreviewState);

  const handleClose = () => {
    dispatch(closeMedia());
  };
  const handleMediaError = (e) => {
    if (media_type === "image") {
      e.target.src = dummyImage;
    } else {
      e.target.poster = dummyImage; // For video, set a poster image on error
    }
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
        {media_type === "image" ? (
          <img
            src={url}
            alt="advertisement"
            className={classes.box__img}
            onError={handleMediaError}
          />
        ) : (
          <video
            src={url}
            className={classes.box__video}
            controls
            onError={handleMediaError}
          ></video>
        )}
      </motion.div>
    </motion.div>
  ) : null;
};
