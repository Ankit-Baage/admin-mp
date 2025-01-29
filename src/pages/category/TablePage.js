import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Table } from "../../component/table/Table";
import { columnsConfig } from "./columnsDef";
import { downloadRequest } from "../../http-request/downloadFile";
import { toast } from "react-toastify";
import { openModal } from "../../store/modalSlice";

export const TablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();

  const handleDownload = useCallback(
    async (rowData) => {
      try {
        toast.success("downloading...");
        const fileData = await downloadRequest({
          category,
          requestId: rowData.request_id,
        });
        console.log(category);
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
      } catch (err) {
        console.error("Error occurred during download:", err);
        toast.success("error while downloading");
      }
    },
    [category]
  );


  const handleOpenModal = useCallback(
    (rowData) => {
      console.log(rowData)
      dispatch(
        openModal({
          component: "DynamicForm",
          uiData: {
            heading: "Approve or Reject the request.",
            primaryButtonLabel: "Reject",
            secondaryButtonLabel: "Approve",
          },
          configData: {
            category,
            ...rowData, 
          },
          operationType: "approve",
          module: "inventory"
        })
      );
    },
    [category, dispatch]
  );

  useEffect(() => {
    if (columnsConfig[category]) {
      setColumnDefs(columnsConfig[category](handleOpenModal, handleDownload));
    }
  }, [category, handleDownload, handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
