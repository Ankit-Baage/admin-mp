import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import classes from "./variantModal.module.css";
import {
  selectModuleList,
  useGetModuleListQuery,
} from "../../services/modulesApiSlice";
import {
  selectPageList,
  useGetPageListQuery,
} from "../../services/pagesApiSlice";
import { AdvertisementCustomSelect } from "../advertisementSelect/AdvertisementSelect";
import { FileUploadInput } from "../fileUploadInput/FileUploadInput";
import {
  useAddAdvertisementMutation,
  useDeleteAdvertisementListMutation,
  useUpdateAdvertisementListMutation,
} from "../../services/updateAdvertisementSlice";
import { toast } from "react-toastify";
import {
  onClose,
  selectVariantModalState,
} from "../../store/variantModalSlice";
import { CustomInput } from "../customInput/CustomInput";
import {
  useAddVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} from "../../services/mastersVariantMutationSlice";
import { useParams } from "react-router-dom";
import { selectMastersVariantState } from "../../store/mastersVariantFilterSlice";

export const VariantModal = () => {
  const { isOpen, variantData } = useSelector(selectVariantModalState);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      brand: "",
      model: "",
      ram: "",
      rom: "",
      color: "",
      part_name: "",
      price: "",
      original_price: "",
    },
  });

  const { isDirty, isValid } = formState;

  const inputs = [
    { id: "brand", type: "text", placeholder: "Brand", register: register },
    { id: "model", type: "text", placeholder: "Model", register: register },
    { id: "ram", type: "text", placeholder: "Ram", register: register },
    { id: "rom", type: "text", placeholder: "Rom", register: register },
    { id: "color", type: "text", placeholder: "Color", register: register },
    {
      id: "part_name",
      type: "text",
      placeholder: "Part Name",
      register: register,
    },
    {
      id: "price",
      type: "text",
      placeholder: "Price",
      register: register,
    },
    {
      id: "original_price",
      type: "text",
      placeholder: "Original price",
      register: register,
    },
  ];

  const dispatch = useDispatch();
  const params = useParams();
  const masterVariantState = useSelector(selectMastersVariantState);

  const { isSuccess: moduleSuccess } = useGetModuleListQuery();
  const moduleList = useSelector(selectModuleList);
  const { isSuccess: pageSuccess } = useGetPageListQuery();
  const pageList = useSelector(selectPageList);

  const [updateVariant] = useUpdateVariantMutation();
  const [deleteVariant] = useDeleteVariantMutation();
  const [addVariant] = useAddVariantMutation();

  console.log(variantData);

  useEffect(() => {
    if (variantData) {
      reset({
        brand: variantData?.brand,
        model: variantData?.model,
        color: variantData?.color,
        ram: variantData?.ram,
        rom: variantData?.rom,
        part_name: variantData?.part_name,
        price: variantData?.price,
        original_price: variantData?.original_price,
      });
    }
  }, [variantData, reset]);

  const submitHandler = async (formData) => {
    if (variantData?.action === "Edit") {
      const advertisementData = {
        id: variantData.id,
        ...formData,
        category: masterVariantState.category,
      };
      try {
        const response = await updateVariant(advertisementData).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (variantData?.action === "Delete") {
      try {
        console.log(masterVariantState.category);
        const response = await deleteVariant({
          id: variantData.id,
          category: masterVariantState.category,
        }).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to delete advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (variantData?.action === "Add") {
      try {
        console.log(formData);
        const response = await addVariant({
          ...formData,
          category: masterVariantState.category,
        }).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to add advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    }
  };

  const handleClose = () => {
    dispatch(onClose());
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
          <h3 className={classes.form__title}>
            Do You Want To {variantData?.action} ?
          </h3>
          <div className={classes.form__group__box}>
            {inputs.map((input) => (
              <CustomInput
                key={input.id}
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                register={input.register}
              />
            ))}
          </div>

          <div className={classes.buttonGroup}>
            <button
              type="button"
              className={classes.buttonGroup__cancel}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`
    ${classes.buttonGroup__submit}
    ${variantData?.action === "Delete" ? classes.delete : ""}
    ${variantData?.action === "Add" ? classes.add : ""}
    ${variantData?.action === "Edit" ? classes.edit : ""}
    ${
      variantData?.action === "Edit" && isValid && isDirty
        ? classes.isUpdateActive
        : ""
    }
    ${variantData?.action === "Add" && isValid ? classes.isAddActive : ""}
  `}
              disabled={
                (variantData?.action === "Edit" && (!isDirty || !isValid)) ||
                (variantData?.action === "Add" && !isValid)
              }
            >
              {variantData?.action}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
