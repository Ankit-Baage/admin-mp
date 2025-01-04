import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBackdropState,
  closeBackdrop,
} from "../../../store/backdropSlice";
import { motion } from "framer-motion";
import classes from "./backdrop.module.css";

export const Backdrop = ({ children }) => {
  const isOpen = useSelector(selectBackdropState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeBackdrop());
    console.log("closed");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <motion.div
      className={classes.backdrop}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
