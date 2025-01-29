import React, { useCallback, useEffect, useState } from "react";

import { retailerTableColumnsConfig } from "./retailerTableColumnsConfig";
import { Table } from "../../../component/table/Table";
import { onOpen } from "../../../store/retailerActionModalSlice";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

export const RetailerTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const dispatch = useDispatch();

  // const handleOpenModal = useCallback(
  //   (rowData, action) => {
  //     dispatch(onOpen(rowData));
  //     console.log("orderData ", rowData);
  //   },
  //   [dispatch]
  // );

  const handleOpenModal = useCallback(
      (rowData) => {
        console.log(rowData)
        dispatch(
          openModal({
            component: "DynamicForm",
            uiData: {
              heading: "View And Verify",
              primaryButtonLabel: "Verify",
              isGridRequired: true
            },
            configData: {
              ...rowData,
            },
            operationType: "primary",
            module: "retailer"
          })
        );
      },
      [dispatch]
    );

  useEffect(() => {
    setColumnDefs(retailerTableColumnsConfig["retailer"](handleOpenModal));
  }, [handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
