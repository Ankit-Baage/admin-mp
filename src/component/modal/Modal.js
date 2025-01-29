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
import { Message } from "../message/Message";
import { onClose } from "../../store/actionModalSlice";
import { PriorityPortal } from "../priorityPortal/PriorityPortal";
import { useUpdateRetailerListMutation } from "../../services/updateRetailerApiSlice";
import { useUpdateOrderListMutation } from "../../services/updateOrderApiSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, component, uiData, configData, operationType, module } =
    useSelector((state) => state.modal);
  const [rejectRequest] = useRejectRequestMutation();
  const [approveRequest] = useApproveRequestMutation();

  const [updateRetailerList] = useUpdateRetailerListMutation();
  const [updateOrderList] = useUpdateOrderListMutation();

  // Dynamically generate modal configuration
  const modalConfig = useMemo(() => {
    if (!configData) return [];

    if (module === "inventory") {
      return [
        {
          id: "requestId",
          type: "text",
          defaultValue: configData.request_id,
          label: "Request Id",
          placeholder: "Request Id",
          disabled: true,
        },
        {
          id: "originalPrice",
          type: "text",
          defaultValue: configData.original_price,
          label: "Original Price",
          placeholder: "Original Price",
          disabled: true,
        },
        {
          id: "remarks",
          type: "textarea",
          defaultValue: configData.remarks === "-" ? null : configData.remarks,
          label: "Remarks*",
          placeholder: "Remarks*",
          disabled: configData.approval_status !== "pending",
        },
      ];
    } else if (module === "retailer") {
      return [
        {
          id: "phoneNumber",
          type: "text",
          defaultValue: configData.mobile_no,
          label: "Phone Number",
          placeholder: "Phone Number",
          disabled: true, // Read-only field for update as well
        },
        {
          id: "status",
          type: "select",
          options: [
            { id: 3, label: "Approve" },
            { id: 4, label: "Reject" },
          ],
          label: "Choose Status",
        },
        {
          id: "aadharNumber",
          type: "text", // Allow editing
          defaultValue: configData.aadhar_number,
          label: "Aadhar Number",
          placeholder: "Aadhar Number",
          disabled: true, // Editable field
        },
        // {
        //   id: "aadharImage",
        //   type: "file", // Allow editing
        //   defaultValue: configData?.aadhar_image_url,
        //   url: configData?.aadhar_image_url,
        //   label: "Aadhar Image",
        //   urlWithExt: configData?.aadharUrlLabel,
        //   disabled: true, // Editable field
        // },
        {
          id: "aadharImage",
          type: "preview", // Allow editing
          defaultValue: configData?.aadhar_image_url,
          url: configData?.aadhar_image_url,
          label: "Aadhar Image",
          urlWithExt: configData?.aadharUrlLabel,
          disabled: true, // Editable field
        },
        {
          id: "panNumber",
          type: "text", // Allow editing
          defaultValue: configData.pan_number,
          label: "Pan Number",
          disabled: true, // Editable field
        },
        // {
        //   id: "PanImage",
        //   type: "file", // Allow editing
        //   defaultValue: configData.pan_image_url,
        //   url: configData?.pan_image_url,
        //   label: "Pan Image",
        //   urlWithExt: configData.panUrlLabel,

        //   disabled: true,
        // },
        {
          id: "PanImage",
          type: "preview", // Allow editing
          defaultValue: configData.pan_image_url,
          url: configData?.pan_image_url,
          label: "Pan Image",
          urlWithExt: configData.panUrlLabel,

          disabled: true,
        },
      ];
    } else if (module === "order") {
      return [
        {
          id: "orderId",
          type: "text",
          defaultValue: configData?.order_id,
          label: "Order Id",
          placeholder: "Order Id",
          disabled: true, // Read-only field for update as well
        },
        {
          id: "transactionId",
          type: "text",
          defaultValue: configData?.transaction_id,
          label: "Transaction Id",
          placeholder: "Transaction Id",
          disabled: false, // Read-only field for update as well
        },
        {
          id: "paymentStatus",
          type: "text",
          defaultValue: configData.payment_status,
          label: "Payment Status",
          placeholder: "Payment Status",
          disabled: true, // Read-only field for update as well
        },
        {
          id: "paymentDetails",
          type: "text",
          defaultValue: configData.payment_details,
          label: "Payment Details",
          placeholder: "Payment Details",
          disabled: true,
        },
        {
          id: "status",
          type: "select",
          options: [
            { id: 1, label: "Approve" },
            { id: 2, label: "Reject" },
          ],
          label: "Choose Status",
        },
        {
          id: "file",
          type: "file", // Allow editing
          defaultValue: configData.url,
          label: "Upload",
          url:configData?.url,
          urlWithExt: configData?.urlLabel,
          disabled: true, // Editable field
        },
      ];
    } else {
      return [];
    }
    // Default fallback if the operationType is not recognized
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

  const handlePrimary = useCallback(
    async (data) => {
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
            console.log("reject");
            response = await rejectRequest({
              category: configData.category,
              request_id: configData.request_id,
              remarks: data.remarks,
            }).unwrap();
            console.log(data);
            break;

          case "masters":
            response = await rejectRequest({
              category: configData.category,
              request_id: configData.request_id,
              remarks: data.remarks,
            }).unwrap();
            break;
          case "retailer":
            const payload = {
              id: configData?.id,
              status: data.status,
            };
            console.log(payload);
            response = await updateRetailerList(payload).unwrap();

            break;
          case "order":
            response = await updateOrderList({
              payment_id: configData.payment_id,
              status: data.status,
              url: data.url,
            }).unwrap();

            break;

          default:
            console.error(`Unsupported module: ${module}!`);
            return;
        }

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
    [configData, dispatch, module, rejectRequest, updateOrderList, updateRetailerList]
  );

  // For the modal form, bind the functions to the buttons dynamically:

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
