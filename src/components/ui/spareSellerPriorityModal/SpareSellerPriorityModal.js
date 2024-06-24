import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomSelect } from "../customSelect/CustomSelect";
import classes from "./spareSellerPriorityModal.module.css";

import useGetSpareSellerPriorityList from "../../../tanstack-query/spares/useGetSpareSellerPriorityList";
import useGetPriorityLotList from "../../../tanstack-query/spares/useGetPriorityLotList";
import useGetSpareSellerLot from "../../../tanstack-query/spares/useGetSparesellerLot";

export const SpareSellerPriorityModal = ({ onClose }) => {
  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [selectedLotId, setSelectedLotId] = useState("");
  const [appliedSellerId, setAppliedSellerId] = useState(null);
  const [appliedLotId, setAppliedLotId] = useState(null);
  const [applyInitiated, setApplyInitiated] = useState(false);

  const { data, isSuccess } = useGetSpareSellerPriorityList();
  const { data: lotData, isSuccess: lotSuccess } =
    useGetPriorityLotList(selectedSellerId);
  const { data: sellerLotData, isSuccess: sellerLotSuccess } =
    useGetSpareSellerLot(appliedSellerId, appliedLotId);

  const handleSellerChange = (sellerId) => {
    setSelectedSellerId(sellerId);
    setSelectedLotId("");

    console.log(sellerId);
  };
  const handleLotChange = (lotId) => {
    setSelectedLotId(lotId);

    console.log(lotId);
  };

  const handleApply = () => {
    setAppliedSellerId(selectedSellerId);
    setAppliedLotId(selectedLotId);
    setApplyInitiated(true);
  };

  useEffect(() => {
    if (applyInitiated && sellerLotSuccess) {
      onClose();
    }
  }, [applyInitiated, sellerLotSuccess, onClose]);

  const confirmationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const handleClose = () => {
    // dispatch(closePriorityModal());
  };
  return (
    <motion.div className={classes.modal} onClick={onClose}>
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className={classes.modal__content}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={confirmationVariants}
          transition={{ duration: 0.5 }}
        >
          <h1 className={classes.modal__title}>*Please Select Seller First</h1>
          <div className={classes.modal__select}>
            <select
              className={classes.selection}
              onChange={(event) => handleSellerChange(event.target.value)}
              value={selectedSellerId}
            >
              <option value="" className={classes.selection__option}>
                Select Seller
              </option>
              {isSuccess &&
                Array.isArray(data?.data?.data) &&
                data.data.data.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className={classes.selection__option}
                  >
                    {option.seller}
                  </option>
                ))}
            </select>

            <select
              className={classes.selection}
              onChange={(event) => handleLotChange(event.target.value)}
              value={selectedLotId}
              disabled={!selectedSellerId} // Disable lot selection if no seller is selected
            >
              <option value="" className={classes.selection__option}>
                Select Lot
              </option>
              {lotSuccess &&
                Array.isArray(lotData?.data?.data) &&
                lotData.data.data.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className={classes.selection__option}
                  >
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
          <button className={classes.modal__btn} onClick={handleApply}>
            Apply
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
