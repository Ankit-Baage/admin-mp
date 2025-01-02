import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import search from "../../assets/search.svg";
import classes from "./searchInput.module.css";
import { useDispatch } from "react-redux";
import { setVrp_no } from "../../store/mastersVrpFiltersSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchInput = ({ placeholder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const { searchText } = data;
    if (searchText.trim()) {
      console.log("Submitted search text:", searchText);
      dispatch(setVrp_no({ vrp_no: searchText }));

      // Update URL search parameters
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("vrp_no", searchText);
      navigate(`?${queryParams.toString()}`, { replace: true });
    } else {
      dispatch(setVrp_no({ vrp_no: null }));

      // Remove the search parameter from URL
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("vrp_no");
      navigate(`?${queryParams.toString()}`, { replace: true });
    }
  };

  useEffect(() => {
    // Get search parameter from URL
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get("vrp_no") || "";
    dispatch(setVrp_no({ vrp_no: searchText }));

    // Set the input value based on the URL
    setValue("searchText", searchText);
  }, [dispatch, location.search, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <label htmlFor="searchInput" className={classes.container__label}>
        <input
          id="searchInput"
          type="text"
          placeholder={placeholder}
          className={classes.container__input}
          {...register("searchText")}
        />
      </label>
      <button type="submit" className={classes.container__box}>
        <img
          src={search}
          alt="search"
          className={classes.container__box__img}
        />
        <span className={classes.container__box__btn}>Search</span>
      </button>
    </form>
  );
};
