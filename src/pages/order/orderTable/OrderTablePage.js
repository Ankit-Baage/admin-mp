import React, { useCallback, useEffect, useState } from "react";

import { orderTableColumnsConfig } from "./orderTableColumnsConfig";
import { Table } from "../../../component/table/Table";
import { useDispatch } from "react-redux";
import { onOpen } from "../../../store/orderActionModalSlice";

export const OrderTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
  const handleOpenModal = useCallback(
    (rowData, action) => {
      dispatch(onOpen(rowData));
      console.log("orderData ", rowData);
    },
    [dispatch]
  );

  useEffect(() => {
    setColumnDefs(orderTableColumnsConfig["order"](handleOpenModal));
  }, [handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
