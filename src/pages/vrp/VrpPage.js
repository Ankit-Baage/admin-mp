import React, { useEffect, useState } from "react";
import useGetVrp from "../../tanstack-query/vrp/useGetVrp";
import { BasicTable } from "../../components/table/BasicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import classes from "./vrpPage.module.css";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "../../store/toaster/toasterActions";
import { Modal } from "../../components/ui/modal/Modal";
import { vrpRejectRequest } from "../../utils/https-request/vrp/vrpRejectRequest";

import { vrpApprovalRequest } from "../../utils/https-request/vrp/vrpApprovalRequest";
import { vrpDownloadRequest } from "../../utils/https-request/vrp/vrpDownloadRequest";
import { SellerListPage } from "./SellerListPage";
import { SellerStatusPage } from "./SellerStatusPage";
import { useSearchParams } from "react-router-dom";
import { formatNumber } from "../../utils/helpers/formatNumber";

export const VrpPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [vrpData, setVrpData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sellerId = searchParams.get("seller_id");
  const status = searchParams.get("status");
  const initialFilters = {
    seller_id: sellerId || "0",
    status: status || "0",
  };
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(initialFilters);

  const { data, isError, isLoading, isSuccess, error, refetch } =
    useGetVrp(filters);

  const rejectMutation = useMutation({
    mutationFn: vrpRejectRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vrp"] });
      dispatch(
        showToastWithTimeout(response.message.displayMessage, "#00A167")
      );
    },
    onError: (error) => {
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    },
  });
  const approvalMutation = useMutation({
    mutationFn: vrpApprovalRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vrp"] });
      dispatch(
        showToastWithTimeout(response.message.displayMessage, "#00A167")
      );
    },
    onError: (error) => {
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    },
  });

  useEffect(() => {
    if (isLoading) {
      setVrpData([]);
      dispatch(showToastWithTimeout("Loading...", "#FF6F3F"));
    } else if (isSuccess) {
      setVrpData(data.data.data);
      dispatch(showToastWithTimeout("Vrp Details Found", "#00A167"));
    } else if (isError) {
      setVrpData([]);
      dispatch(showToastWithTimeout("Error: Vrp Details Not Found", "#D32F2F"));
    }
  }, [isLoading, isSuccess, isError, data, dispatch]);

  const onDownload = async (rowData) => {
    dispatch(showToastWithTimeout("Downloading...", "#00A167"));

    try {
      const fileData = await vrpDownloadRequest({
        requestId: rowData.request_id,
      });
      const contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const blob = new Blob([fileData], { type: contentType });

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `mobiGarage_${rowData.request_id}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error occurred during download:", error);
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    }
  };

  const onSellerFilter = (sellerId) => {
    setSearchParams((params) => {
      params.set("seller_id", sellerId);
      return params.toString();
    });
  };

  const onStatusFilter = (status) => {
    setSearchParams((params) => {
      params.set("status", status);
      return params.toString();
    });
  };

  const handleApplied = () => {
    const sellerParams = searchParams.get("seller_id");
    const statusParams = searchParams.get("status");
    setFilters((prevFilters) => ({
      ...prevFilters,
      seller_id: sellerParams,
      status: statusParams,
    }));
  };

  const openModal = (rowData) => {
    setSelectedRow(rowData);
    setShowConfirmation(rowData.request_id);
    console.log(rowData);
    dispatch(showToastWithTimeout("Take Action", "#00A167"));
  };

  const closeModal = () => {
    setShowConfirmation(null);
  };

  const onReject = async (requestId, remarks) => {
    await rejectMutation.mutate({ requestId: requestId, remarks: remarks });
    closeModal();
    dispatch(showToastWithTimeout("Request Rejected"));
  };

  const onApproval = async () => {
    await approvalMutation.mutate({ requestId: showConfirmation });
    closeModal();
    dispatch(showToastWithTimeout("Request Approved"));
  };

  const columnHelper = createColumnHelper();

  // Define your columns using the column helper
  const columns = [
    columnHelper.accessor("lot_id", {
      header: "Lot Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("request_id", {
      header: "Request Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor("original_price", {
      header: "Original Price",
      cell: (info) => formatNumber(info.getValue()),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor("rate_card", {
      header: "Rate Card",
      cell: (info) => formatNumber(info.getValue()),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "lotStatus",
      header: <div style={{ textAlign: "center" }}>Lot Status</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            // disabled={
            //   props.row.original.approval_status === "pending for status"
            // }
            // onClick={() => onDownload(props.row.original)}
            style={{
              width: "76px",
              color: "#FFFFFF",
              backgroundColor: "#46CD80",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
           Sold
          </button>
          {/* <AnimatePresence>
            {showConfirmation === props.row.original.request_id && (
              <motion.div
                onClick={closeModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Modal
                  data={selectedRow}
                  onReject={(requestId, remarks) => {
                    onReject(requestId, remarks);
                  }}
                  onApproval={onApproval}
                />
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => openModal(props.row.original)}
            style={{
              width: "76px",
              color: "#FFFFFF",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              backgroundColor:
                props.row.original.approval_status === "approved"
                  ? "#00A167"
                  : props.row.original.approval_status === "pending"
                  ? "#FF6F3F"
                  : "#FF0000",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {props.row.original.approval_status === "approved"
              ? "Approved"
              : props.row.original.approval_status === "pending"
              ? "Pending"
              : "Rejected"}
          </button>
          <AnimatePresence>
            {showConfirmation === props.row.original.request_id && (
              <motion.div
                onClick={closeModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Modal
                  data={selectedRow}
                  onReject={(requestId, remarks) => {
                    onReject(requestId, remarks);
                  }}
                  onApproval={onApproval}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    }),

    columnHelper.display({
      id: "download",
      header: <div style={{ textAlign: "center" }}>Download</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={
              props.row.original.approval_status === "pending for status"
            }
            onClick={() => onDownload(props.row.original)}
            style={{
              width: "76px",
              color: "#FFFFFF",
              backgroundColor: "#46CD80",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Download
          </button>
          <AnimatePresence>
            {showConfirmation === props.row.original.request_id && (
              <motion.div
                onClick={closeModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Modal
                  data={selectedRow}
                  onReject={(requestId, remarks) => {
                    onReject(requestId, remarks);
                  }}
                  onApproval={onApproval}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    }),
  ];

  return (
    <div className={classes.box}>
      <div className={classes.status}>
        <SellerListPage
          sellerId={filters.seller_id}
          onFilter={(sellerId) => onSellerFilter(sellerId)}
        />
        <SellerStatusPage
          status={filters.status}
          onFilter={(status) => onStatusFilter(status)}
        />
        <button className={classes.status__apply} onClick={handleApplied}>
          Apply
        </button>
      </div>

      <BasicTable data={vrpData} columns={columns} />
    </div>
  );
};
