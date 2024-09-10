import React from "react";
import { useForm } from "react-hook-form";
import search from "../../assets/search.svg";
import classes from "./searchInput.module.css";
import { useDispatch } from "react-redux";
import { setVrp_no } from "../../store/mastersVrpFiltersSlice";

export const SearchInput = ({ placeholder }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm(); // Hook form setup

  const onSubmit = (data) => {
    const { searchText } = data;
    if (searchText.trim()) {
      console.log(searchText);
      dispatch(setVrp_no({ vrp_no: searchText })); // Dispatch the search text to the Redux store if valid
    } else {
      dispatch(setVrp_no({ vrp_no: null })); // Dispatch null if there is no search text
    }
    // Optionally reset the input field after submission
    // reset();
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <label htmlFor="searchInput" className={classes.container__label}>
        <input
          id="searchInput"
          type="search"
          placeholder={placeholder}
          className={classes.container__input}
          {...register("searchText")} // Register the input with React Hook Form
        />
      </label>
      <button type="submit" className={classes.container__box}>
        <img
          src={search}
          alt="search"
          className={classes.container__box__img}
        />
        |<span className={classes.container__box__btn}>Search</span>
      </button>
    </form>
  );
};
