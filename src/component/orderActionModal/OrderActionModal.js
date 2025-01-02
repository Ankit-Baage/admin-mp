import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import classes from "./orderActionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  onClose,
  selectOrderActionModalState,
} from "../../store/orderActionModalSlice";
import { toast } from "react-toastify";
import { useUpdateOrderListMutation } from "../../services/updateOrderApiSlice";
import { CustomInput } from "../customInput/CustomInput";
import { FileUploadInput } from "../fileUploadInput/FileUploadInput";
import { AdvertisementCustomSelect } from "../advertisementSelect/AdvertisementSelect";

const statuses = [
  { id: 1, itemLabel: "success" },
  { id: 2, itemLabel: "Pending" },
];
export const OrderActionModal = () => {
  const { isOpen, modalData } = useSelector(selectOrderActionModalState);
  const [uploadedImage, setUploadedImage] = useState({
    url: "",
    urlLabel: "",
  });

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      order_id: "",
      transaction_id: "",
      payment_status: "",
      payment_details: "",
    },
  });
  const dispatch = useDispatch();

  const [updateOrderList] = useUpdateOrderListMutation();

  useEffect(() => {
    if (modalData) {
      reset({
        order_id: modalData?.order_id,
        transaction_id: modalData?.transaction_id,
        payment_status: modalData?.payment_status,
        payment_details: modalData?.payment_details || "",
      });
    }
  }, [modalData, reset]);

  const handleClose = () => {
    dispatch(onClose());
  };
  const handleChange = (imageUrl) => {
    const urlParts = imageUrl.split("/");
    const urlLabelWithExt = urlParts[urlParts.length - 1];
    console.log(imageUrl);
    setUploadedImage({ url: imageUrl, urlLabel: urlLabelWithExt });
  };
  const submitHandler = async (formData) => {
    const orderData = {
      id: modalData.id,
      status: +formData.status,
      url: uploadedImage.url,
    };
    try {
      console.log(orderData);
      const response = await updateOrderList(orderData).unwrap();
      toast.success(response.message.displayMessage);
      handleClose();
    } catch (err) {
      console.error("Failed to update orderData:", err);
      toast.error(err.data.message.displayMessage);
    }
  };

  return isOpen ? (
    <motion.div
      onClick={handleClose}
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <h3 className={classes.form__title}>View & Verify</h3>
          <div className={classes.form__group}>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="order_id"
                type="text"
                placeholder="Order ID"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="transaction_id"
                type="text"
                placeholder="Transaction ID"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <AdvertisementCustomSelect
                    {...field}
                    optionData={statuses}
                    label="Payment Status"
                    onChange={(itemId) => field.onChange(itemId)}
                  />
                )}
              />
            </div>

            <div className={classes.form__group__seq}>
              {/* <CustomInput
                id="payment_status"
                type="text"
                placeholder="Payment Status"
                register={register}
              /> */}

              <FileUploadInput
                urlWithExt={uploadedImage.urlLabel}
                url={uploadedImage.url}
                onSelection={(imageUrl) => handleChange(imageUrl)}
              />
            </div>
          </div>

          <div className={classes.buttonGroup}>
            <button
              type="button"
              className={classes.buttonGroup__cancel}
              onClick={handleClose}
            >
              Reject
            </button>
            <button type="submit" className={classes.buttonGroup__submit}>
              Approve
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
