import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import classes from "./buttonSlider.module.css";

export const ButtonSlider = ({ children, className = "", style = {} }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [children]);

  return (
    <div className={`${classes.container__routes} ${className}`} style={style}>
      <motion.div className={classes.box__colors__carousel} ref={carousel}>
        <motion.div
          className={classes.box__colors__carousel__inner}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
