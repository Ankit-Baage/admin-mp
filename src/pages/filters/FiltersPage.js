import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSellerList,
  useGetSellerListQuery,
} from "../../services/sellerApiSlice";
import { selectCategoryState, setFilters } from "../../store/categorySlice";
import {
  selectStatusList,
  useGetStatusListQuery,
} from "../../services/statusApiSlice";

import classes from "./filterPage.module.css";
import { useSearchParams } from "react-router-dom";
import { onOpen } from "../../store/priorityModalSlice";
// import { CustomSelect } from "../../component/customSelect/CustomSelect";
import { CustomSelect } from "../../component/dynamicForm/customSelect/CustomSelect";
import { openModal } from "../../store/modalSlice";

export const FiltersPage = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const category = useSelector(selectCategoryState);
  const { isSuccess } = useGetSellerListQuery(
    { category: category.category },
    { skip: !category.category }
  );
  const sellerList = useSelector(selectSellerList);

  const { isSuccess: isStatusSuccess } = useGetStatusListQuery(
    { category: category.category },
    { skip: !category.category }
  );
  const statusList = useSelector(selectStatusList);

  const handlePriorityModal = () => {
    dispatch(onOpen());
  };
  

  useEffect(() => {
    const sellerParam = searchParams.get("seller_id");
    const statusParam = searchParams.get("status");

    if (filters.seller_id !== sellerParam || filters.status !== statusParam) {
      dispatch(
        setFilters({
          seller_id: sellerParam || null,
          status: statusParam || null,
        })
      );
    }
  }, [dispatch, searchParams, filters]);

  const updateFilterParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
    dispatch(setFilters({ [key]: value || null }));
  };

  const handleSelection = (identifier, selectedOptionId) => {
    updateFilterParams(identifier, selectedOptionId);
  };

  return (
    <div className={classes.box}>
      <CustomSelect
        options={sellerList}
        label="Select Seller"
        onChange={(option) => {
          handleSelection("seller_id", option);
        }}
        value={category.seller_id || ""}
      />
      <CustomSelect
        options={statusList}
        label="Select Status"
        onChange={(option) => {
          handleSelection("status", option);
        }}
        value={category.status || ""}
      />

      <button
        className={`${classes.box__btn} ${classes.box__btn__secondary}`}
        onClick={handlePriorityModal}
      >
        Set Priority
      </button>
    </div>
  );
};
