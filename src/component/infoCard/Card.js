import React from "react";
import classes from "./card.module.css";
import { Badge } from "./Badge";

export const Card = ({ children, className = "", style = {}, badge }) => {
  return (
    <div className={`${classes.box} ${className}`} style={style}>
      {badge && <Badge status={badge.status}/>}
      {children}
    </div>
  );
};
