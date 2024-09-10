import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import classes from "./mastersVrpActionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  onClose,
  selectMastersVrpActionModalState,
} from "../../store/mastersVrpActionModalSlice";
import { CustomInput } from "../customInput/CustomInput";

import { toast } from "react-toastify";
import { selectMastersState } from "../../store/mastersVrpFiltersSlice";
import { useAddMasterVrpMutation, useApproveMasterVrpMutation, useRejectMasterVrpMutation } from "../../services/updateMastersVrpSlice";

const inputs = [
  { id: "brand", name: "brand", type: "text", placeholder: "Brand" },
  { id: "model", name: "Model", type: "text", placeholder: "Model" },
  { id: "ram", name: "ram", type: "text", placeholder: "Ram" },
  { id: "rom", name: "rom", type: "text", placeholder: "Rom" },
  { id: "color", name: "color", type: "text", placeholder: "Color" },
];

export const MastersVrpActionModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalData } = useSelector(selectMastersVrpActionModalState);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: modalData,
    validateCriteriaMode: "all",
  });

  const [approveMaster] = useApproveMasterVrpMutation();
  const [rejectMaster] = useRejectMasterVrpMutation();
  const [addMaster] = useAddMasterVrpMutation();
  console.log(modalData);

  const handleClose = () => {
    dispatch(onClose());
  };

  useEffect(() => {
    if (modalData) {
      reset({
        id: modalData.id,
        action: modalData.action,
        brand: modalData.brand || "", // Default to empty string if null
        model: modalData.model || "",
        ram: modalData.ram || "",
        rom: modalData.rom || "",
        color: modalData.color || "",
        modifiedBrand: modalData.modifiedBrand || "",
        modifiedModel: modalData.modifiedModel || "",
        modifiedRam: modalData.modifiedRam || "",
        modifiedRom: modalData.modifiedRom || "",
        modifiedColor: modalData.modifiedColor || "",
      });
    }
  }, [modalData, reset]);

  const submitHandler = async (formData) => {
    if (modalData?.action === "Reject") {
      try {
        const response = await rejectMaster({
          id: formData.id,
        }).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (modalData?.action === "Approve") {
      try {
        const response = await approveMaster({
          id: formData.id,
        }).unwrap();

        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (modalData?.action === "Add") {
      try {
        console.log(formData);
        const response = await addMaster({
          brand: formData.brand,
          model: formData.model,
          ram:formData.ram,
          rom: formData.rom,
          color: formData.color
        }).unwrap();

        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
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
        <h3 className={classes.box__title}>{modalData?.action}</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={classes.box__form}
        >
          {inputs.map((input) => (
            <CustomInput
              key={input.id}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              register={register}
              defaultValue={modalData ? modalData[input.id] : ""}
            />
          ))}

          <div className={classes.box__buttonGroup}>
            <button
              type="button"
              className={classes.box__buttonGroup__cancel}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className={classes.box__buttonGroup__submit}>
              {modalData?.action}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
