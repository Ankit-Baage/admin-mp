import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  selectAdvertisementActionModalState,
  onClose,
} from "../../store/advertisementActionModalSlice";
import classes from "./advertisementActionModal.module.css";
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

const medias = [
  { id: "image", itemLabel: "image" },
  { id: "video", itemLabel: "video" },
];

export const AdvertisementActionModal = () => {
  const { isOpen, modalData } = useSelector(
    selectAdvertisementActionModalState
  );

  const { register, handleSubmit, control, reset, formState } = useForm({
    defaultValues: {
      sequence: "",
      category: "",
      page: "",
      url: "",
      media_type: "",
    },
  });

  const { isDirty, isValid, isSubmitting } = formState;

  const dispatch = useDispatch();

  const { isSuccess: moduleSuccess } = useGetModuleListQuery();
  const moduleList = useSelector(selectModuleList);
  const { isSuccess: pageSuccess } = useGetPageListQuery();
  const pageList = useSelector(selectPageList);

  const [updateAdvertisementList] = useUpdateAdvertisementListMutation();
  const [deleteAdvertisementList] = useDeleteAdvertisementListMutation();
  const [addAdvertisement] = useAddAdvertisementMutation();

  useEffect(() => {
    if (modalData) {
      reset({
        sequence: modalData?.sequence,
        category: modalData?.category,
        page: modalData?.page,
        url: modalData?.url,
        media_type: modalData?.media_type,
      });
    }
  }, [modalData, reset]);

  const submitHandler = async (formData) => {
    if (modalData?.action === "Update") {
      const advertisementData = {
        sequence: formData.sequence,
        category: formData.category,
        page: formData.page,
        url: formData.url,
        media_type: formData.media_type,
      };
      try {
        const response = await updateAdvertisementList({
          id: modalData.id,
          ...advertisementData,
        }).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (modalData?.action === "Delete") {
      try {
        const response = await deleteAdvertisementList({
          id: modalData.id,
        }).unwrap();
        toast.success(response.message.displayMessage);
        handleClose();
      } catch (err) {
        console.error("Failed to delete advertisement:", err);
        toast.error(err.data.message.displayMessage);
      }
    } else if (modalData?.action === "Add") {
      try {
        const response = await addAdvertisement({ ...formData }).unwrap();
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
            {modalData?.action} Advertisement
          </h3>
          <div className={classes.form__group}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <AdvertisementCustomSelect
                  {...field}
                  optionData={moduleList}
                  label="Module"
                  onChange={(itemId) => field.onChange(itemId)}
                />
              )}
            />
            <Controller
              name="page"
              control={control}
              render={({ field }) => (
                <AdvertisementCustomSelect
                  {...field}
                  optionData={pageList}
                  label="Page"
                  onChange={(itemId) => field.onChange(itemId)}
                />
              )}
            />
            <Controller
              name="media_type"
              control={control}
              render={({ field }) => (
                <AdvertisementCustomSelect
                  {...field}
                  optionData={medias}
                  label="Media Type"
                  onChange={(itemId) => field.onChange(itemId)}
                />
              )}
            />
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <FileUploadInput
                  {...field}
                  label="Upload Media"
                  urlWithExt={modalData?.urlLabel}
                  onChange={(itemId) => field.onChange(itemId)}
                />
              )}
            />
            <div className={classes.form__group__seq}>
              <input
                id="sequence"
                name="sequence"
                type="number"
                className={classes.form__field}
                placeholder="Sequence"
                {...register("sequence", { required: true })}
              />
              <label htmlFor="sequence" className={classes.form__label}>
                Sequence
              </label>
            </div>
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
              className={`${classes.buttonGroup__submit} ${
                (modalData?.action === "Update" && isDirty &isValid) ||
                (modalData?.action === "Add" && isValid)
                  ? classes.isActive
                  : ""
              }`}
              disabled={
                (modalData?.action === "Update" && !isDirty && !isValid) ||
                (modalData?.action === "Add" && !isValid)
              }
            >
              {modalData?.action}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
