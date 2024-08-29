import React, { useState } from "react";
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

const medias = [
  { id: "image", itemLabel: "image" },
  { id: "video", itemLabel: "video" },
];

export const AdvertisementActionModal = () => {
  const { isOpen, modalData } = useSelector(
    selectAdvertisementActionModalState
  );

  const [selectedValues, setSelectedValues] = useState({
    sequence: null,
    category: null,
    page: null,
    url: null,
    mediaType: null,
  });

  const { isSuccess: moduleSuccess } = useGetModuleListQuery();
  const moduleList = useSelector(selectModuleList);
  const { isSuccess: pageSuccess } = useGetPageListQuery();
  const pageList = useSelector(selectPageList);
  const dispatch = useDispatch();

  const [updateAdvertisementList] = useUpdateAdvertisementListMutation();
  const [deleteAdvertisementList] = useDeleteAdvertisementListMutation();
  const [addAdvertisement] = useAddAdvertisementMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalData?.action === "Update") {
      try {
        await updateAdvertisementList({
          id: modalData.id,
          sequence: modalData.sequence,
          category: selectedValues.category,
          page: selectedValues.page,
          url: selectedValues.url,
          mediaType: selectedValues.mediaType,
        }).unwrap();
        handleClose();
      } catch (err) {
        console.error("Failed to update advertisement:", err);
      }
    } else if (modalData?.action === "Delete") {
      try {
        await deleteAdvertisementList({ id: modalData.id }).unwrap();
        handleClose();
      } catch (err) {
        console.error("Failed to delete advertisement:", err);
      }
    } else if (modalData?.action === "Add") {
      try {
        await addAdvertisement({
          sequence: selectedValues.sequence,
          category: selectedValues.category,
          page: selectedValues.page,
          url: selectedValues.url,
          mediaType: selectedValues.mediaType,
        }).unwrap();
        console.log(selectedValues);
        handleClose();
      } catch (err) {
        console.error("Failed to delete advertisement:", err);
      }
    }
  };
  const handleSelectChange = (field, itemId) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [field]: itemId,
    }));
  };

  const handleClose = () => {
    dispatch(onClose());
  };

  console.log(modalData ? modalData : null);
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
        <form onSubmit={handleSubmit} className={classes.form}>
          <h3 className={classes.form__title}>
            {modalData?.action} Advertisement
          </h3>
          <div className={classes.form__group}>
            <AdvertisementCustomSelect
              optionData={moduleList}
              label="Module"
              selectedId={modalData?.category}
              onChange={(itemId) => handleSelectChange("category", itemId)}
            />
            <AdvertisementCustomSelect
              optionData={pageList}
              label="Page"
              selectedId={modalData?.page}
              onChange={(itemId) => handleSelectChange("page", itemId)}
            />
            <AdvertisementCustomSelect
              optionData={medias}
              label="Media Type"
              selectedId={modalData?.mediaType}
              onChange={(itemId) => handleSelectChange("mediaType", itemId)}
            />
            <FileUploadInput
              label="Upload Media"
              urlWithExt={modalData?.urlLabel}
              onChange={(url) => handleSelectChange("url", url)}
            />
            <div className={classes.form__group__seq}>
              <input
                type="number"
                id="sequence"
                className={classes.form__field}
                placeholder="Sequence"
                defaultValue={modalData?.sequence}
                required
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
            <button type="submit" className={classes.buttonGroup__submit}>
              {modalData?.action}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
