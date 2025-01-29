import React, { useCallback, useEffect, useState } from "react";

import { orderTableColumnsConfig } from "./orderTableColumnsConfig";
import { Table } from "../../../component/table/Table";
import { useDispatch } from "react-redux";
import { onOpen } from "../../../store/orderActionModalSlice";
import { openModal } from "../../../store/modalSlice";

export const OrderTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
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
          module: "order"
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setColumnDefs(orderTableColumnsConfig["order"](handleOpenModal));
  }, [handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
