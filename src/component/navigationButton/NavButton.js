import React from 'react';
import classes from "./navButton.module.css"

export const NavButton = ({image, title}) => {
  return (
    <button className={classes.box}>
      <img src={image} alt={title} className={classes.box__img}/>
      <h1 className={classes.box__title}>{title}</h1>
    </button>
  )
}
