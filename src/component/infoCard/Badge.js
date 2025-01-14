import React from 'react';
import classes from "./badge.module.css"

export const Badge = ({status}) => {
  return (
    <div className={classes.box}>{status}</div>
  )
}
