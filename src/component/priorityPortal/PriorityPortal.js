import React, { useState } from "react";
import classes from "./priorityPortal.module.css";
import {
  selectSellerList,
  useGetSellerListQuery,
} from "../../services/sellerApiSlice";
import { useSelector } from "react-redux";
import { selectLotList, useGetLotListQuery } from "../../services/lotApiSlice";
import { CustomSelect } from "../dynamicForm/customSelect/CustomSelect";
import { selectCategoryState } from "../../store/categorySlice";

export const PriorityPortal = ({
  heading,
  primaryButtonLabel,
  secondaryButtonLabel,
  priorityConfig,
}) => {
  const [currentSellerId, setCurrentSellerId] = useState("");

  const { isSuccess: isLotSuccess } = useGetLotListQuery(
    {
      category: priorityConfig.category,
      seller_id: currentSellerId,
    },
    { skip: !currentSellerId }
  );
  const lotList = useSelector(selectLotList);
  console.log("portal", priorityConfig);
  console.log("lot", lotList)

  const handleChange = (optionId) => {
    setCurrentSellerId(optionId);
    console.log(optionId)
  };

  return (
    <div className={classes.box}>
      <h1 className={classes.box__title}>{}</h1>
      <div className={classes.box__select}>
        <CustomSelect
          options={priorityConfig?.sellerOptions}
          label="Select Seller"
          onChange={handleChange}
        />
         <CustomSelect
          options={lotList||[]}
          label="Select Lot"
          onChange={handleChange}
        />
      </div>
      {/* <div className={classes.box__btns}>
        <button
          disabled={!lot_id}
          className={`${classes.box__btns__btn} ${
            !lot_id ? classes.box__btns__btn : classes.box__btns__btn__apply
          }`}
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className={`${classes.box__btns__btn} ${classes.box__btns__btn__cancel}`}
          onClick={handleClose}
        >
          Cancel
        </button>
      </div> */}
    </div>
  );
};
