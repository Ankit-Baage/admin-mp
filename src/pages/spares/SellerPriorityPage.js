import React, { useState } from "react";
import { motion } from "framer-motion";
import useGetSpareSellerPriorityList from "../../tanstack-query/spares/useGetSpareSellerPriorityList";
import classes from "./sellerPriorityPage.module.css"
const confirmationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const SellerPriorityPage = ({ sellerId, lotId }) => {
  
  const { data, isError, isLoading, isSuccess, error, refetch } =
    useGetSpareSellerPriorityList();
  console.log(data);

  const handleChange = (sellerId) => {

    console.log(sellerId)
  };


  return (
    <motion.div
    className={classes.box}
    onClick={(e) => e.stopPropagation()}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={confirmationVariants}
    transition={{ duration: 0.5 }}
  >
    <select
      className={classes.box}
      onChange={(event) => handleChange(event.target.value)}
      value={sellerId}
    >
      <option value="" className={classes.box__option}>
        Select all sellers
      </option>
      {data?.data.data.map((seller) => (
        <option
          key={seller.id}
          value={seller.id}
          className={classes.box__option}
        >
          {seller.seller}
        </option>
      ))}
    </select>
    <select
      className={classes.box}
      onChange={(event) => handleChange(event.target.value)}
      value={sellerId}
    >
      <option value="" className={classes.box__option}>
        Select all sellers
      </option>
      {data?.data.data.map((seller) => (
        <option
          key={seller.id}
          value={seller.id}
          className={classes.box__option}
        >
          {seller.seller}
        </option>
      ))}
    </select>
    <button type="submit" className={classes.form__btn}>
      Reject
    </button>
  </motion.div>
  );
};
