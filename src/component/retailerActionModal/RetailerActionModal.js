import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import classes from "./RetailerActionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  onClose,
  selectRetailerActionModalState,
} from "../../store/retailerActionModalSlice";
import { toast } from "react-toastify";

import { CustomInput } from "../customInput/CustomInput";
import { useUpdateRetailerListMutation } from "../../services/updateRetailerApiSlice";
import { OrderCustomSelect } from "../orderActionModal/orderActionCustomSelect/OrderCustomSelect";
import { PaymentCustomSelect } from "../paymentCustomSelect/PaymentCustomSelect";


const statuses = [
  { id: 1, label:"Approve" },
  { id: 2, label: "Reject" },
];

export const RetailerActionModal = () => {
  const { isOpen, modalData } = useSelector(selectRetailerActionModalState);

  const [uploadedImage, setUploadedImage] = useState({
    url: modalData?.url,
    urlLabel: modalData?.urlLabel,
  });

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      mobile_no: "",
      aadhar_number: "",
      aadhar_image_url:"",
      pan_number: "",
      pan_image_url:"",
      p_status: "",
    },
  });
  const dispatch = useDispatch();

  const [updateRetailerList] = useUpdateRetailerListMutation();

  useEffect(() => {
    if (modalData) {
      reset({
        mobile_no: modalData?.mobile_no,
        aadhar_number: modalData?.aadhar_number,
        pan_number: modalData?.pan_number,
        p_status: modalData?.p_status,
      });
    }
  }, [modalData, reset]);

  useEffect(() => {
    setUploadedImage({
      url: modalData?.url,
      urlLabel: modalData?.urlLabel,
    });
  }, [modalData?.url, modalData?.urlLabel]);

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
      payment_id: modalData.payment_id,
      status: formData.approval_status,
      ...(uploadedImage.url && { url: uploadedImage.url }),
    };
    try {
      console.log(orderData);
      const response = await updateRetailerList(orderData).unwrap();
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
                id="mobile_no"
                type="text"
                placeholder="Phone Number"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="aadhar_number"
                type="text"
                placeholder="Aadhar Number"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="aadhar_image_url"
                type="text"
                placeholder="Aadhar Card Image"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="pan_number"
                type="text"
                placeholder="Pan Number"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <CustomInput
                id="pan_image_url"
                type="text"
                placeholder="Pan Card Image"
                register={register}
              />
            </div>
            <div className={classes.form__group__seq}>
              <PaymentCustomSelect
                id="p_status"
                label="choose Status"
                register={register}
                optionData={statuses}
              />
            </div>

            {/* <div className={classes.form__group__seq}>
              <OrderActionFileUpload
                urlWithExt={uploadedImage.urlLabel}
                url={uploadedImage.url}
                onSelection={(imageUrl) => handleChange(imageUrl)}
              />
            </div> */}
          </div>

          <div className={classes.buttonGroup}>
            <button
              type="button"
              className={classes.buttonGroup__cancel}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className={classes.buttonGroup__submit}>
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
