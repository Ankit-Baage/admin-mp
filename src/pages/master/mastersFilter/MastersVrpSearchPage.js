import React from "react";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { useDispatch } from "react-redux";
import { onOpen } from "../../../store/mastersVrpActionModalSlice";
import classes from "./mastersVrpSearchPage.module.css";

export const MastersVrpSearchPage = () => {
  const dispatch = useDispatch();
  const handleOpenModal = (action) => {
    console.log(action);
    dispatch(
      onOpen({
        id: null,
        action: action,
        brand: null,
        model: null,
        ram: null,
        rom: null,
        color: null,
        modifiedBrand: null,
        modifiedModel: null,
        modifiedRam: null,
        modifiedRom: null,
        modifiedColor: null,
      })
    );
  };

  return (
    <div className={classes.box}>
      <SearchInput placeholder="Enter Vrp Number" />
      <button className={classes.box__btn} onClick={()=>handleOpenModal("Add")}>Add</button>
    </div>
  );
};
