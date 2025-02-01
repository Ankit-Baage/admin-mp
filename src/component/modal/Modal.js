import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { closeModal } from "../../store/modalSlice";
import { DynamicForm } from "../../component/dynamicForm/DynamicForm";
import {
  useApproveRequestMutation,
  useRejectRequestMutation,
} from "../../services/actionModalApiSlice";
import classes from "./modal.module.css";
import { onClose } from "../../store/actionModalSlice";
import { PriorityPortal } from "../priorityPortal/PriorityPortal";
import { useUpdateRetailerListMutation } from "../../services/updateRetailerApiSlice";
import { useUpdateOrderListMutation } from "../../services/updateOrderApiSlice";
import { formConfig } from "../dynamicForm/formConfig";
import {
  useAddAdvertisementMutation,
  useDeleteAdvertisementListMutation,
  useUpdateAdvertisementListMutation,
} from "../../services/updateAdvertisementSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, component, uiData, configData, operationType, module } =
    useSelector((state) => state.modal);

  const [rejectRequest] = useRejectRequestMutation();
  const [approveRequest] = useApproveRequestMutation();

  const [updateRetailerList] = useUpdateRetailerListMutation();
  const [updateOrderList] = useUpdateOrderListMutation();
  const [deleteAdvertisementList] = useDeleteAdvertisementListMutation();
  const [addAdvertisement] = useAddAdvertisementMutation();
  const [updateAdvertisementList] = useUpdateAdvertisementListMutation();

  const modalConfig = useMemo(() => {
    if (!configData) return [];
    const generateConfig = formConfig[module];
    return generateConfig ? generateConfig(configData) : [];
  }, [configData, module]);

  const handleClose = () => {
    dispatch(closeModal());
  };
  console.log("configData", configData);

  const handleSecondary = useCallback(async () => {
    if (!configData) {
      console.error("Config data is missing!");
      return;
    }

    const id = toast.loading("Processing...");

    try {
      let response;

      switch (module) {
        case "inventory":
          // Handle approve operation for "inventory"
          console.log("approve");
          response = await approveRequest({
            category: configData.category,
            request_id: configData.request_id,
          }).unwrap();
          break;

        case "anotherModule":
          // Handle approve operation for "anotherModule"
          response = await approveRequest({
            category: configData.category,
            request_id: configData.request_id,
          }).unwrap();
          break;

        default:
          console.error(`Unsupported module: ${module}!`);
          return;
      }

      toast.update(id, {
        render: response.message.displayMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(id, {
        render: error.message.displayMessage || "An error occurred!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      dispatch(closeModal());
    }
  }, [approveRequest, configData, dispatch, module]);

  const handlers = useMemo(
    () => ({
      inventory: async (data) =>
        rejectRequest({
          category: configData.category,
          request_id: configData.request_id,
          remarks: data.remarks,
        }).unwrap(),

      masters: async (data) =>
        rejectRequest({
          category: configData.category,
          request_id: configData.request_id,
          remarks: data.remarks,
        }).unwrap(),

      retailer: async (data) =>
        updateRetailerList({
          id: configData?.id,
          status: data.status,
        }).unwrap(),

      order: async (data) =>
        operationType === "Update"
          ? updateOrderList({
              payment_id: configData.payment_id,
              status: data.status,
              url: data.url,
            }).unwrap()
          : null,

      advertisement: async (data) => {
        if (operationType === "Add") {
          return addAdvertisement({
            sequence: data.sequence,
            category: data.module,
            page: data.page,
            url: data.url,
            media_type: data.mediaType,
            params: data.params,
            navigate_to_page: data.navigateTo,
          }).unwrap();
        } else if (operationType === "Update") {
          return updateAdvertisementList({
            id: configData.id,
            sequence: data.sequence,
            category: data.module,
            page: data.page,
            url: data.url,
            media_type: data.mediaType,
            params: data.params,
            navigate_to_page: data.navigateTo,
          }).unwrap();
        } else {
          return deleteAdvertisementList({ id: configData.id }).unwrap();
        }
      },
    }),
    [
      addAdvertisement,
      configData,
      deleteAdvertisementList,
      operationType,
      rejectRequest,
      updateAdvertisementList,
      updateOrderList,
      updateRetailerList,
    ]
  );

  // For the modal form, bind the functions to the buttons dynamically:
  const handlePrimary = useCallback(
    async (data) => {
      if (!configData) {
        console.error("Config data is missing!");
        return;
      }

      const id = toast.loading("Processing...");

      try {
        const handler = handlers[module]; // Get the correct function dynamically
        if (!handler) throw new Error(`Unsupported module: ${module}!`);

        const response = await handler(data);

        toast.update(id, {
          render: response?.message?.displayMessage,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        toast.update(id, {
          render: error.message.displayMessage || "An error occurred!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        console.error(error);
      } finally {
        dispatch(closeModal());
      }
    },
    [handlers, module, configData, dispatch]
  );
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={classes.backdrop}
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={classes.box__wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button className={classes.backdrop__close} onClick={onClose} />
            <motion.div
              className={classes.box}
              onClick={(e) => e.stopPropagation()}
            >
              {component === "DynamicForm" ? (
                <DynamicForm
                  heading={uiData?.heading}
                  isGridRequired={uiData?.isGridRequired}
                  config={modalConfig}
                  onSubmit={handlePrimary}
                  onSecondHandler={handleSecondary}
                  onClose={handleClose}
                  primaryButtonLabel={uiData?.primaryButtonLabel}
                  secondaryButtonLabel={uiData?.secondaryButtonLabel}
                />
              ) : component === "PriorityPortal" ? (
                <PriorityPortal
                  heading={uiData?.heading}
                  // priorityData={priorityConfig}
                  // onSubmit={handlePrioritySubmit}
                  priorityConfig={configData}
                  onClose={handleClose}
                  primaryButtonLabel={uiData?.primaryButtonLabel}
                  secondaryButtonLabel={uiData?.secondaryButtonLabel}
                />
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
