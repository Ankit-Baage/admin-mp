import React, { useCallback, useEffect, useState } from "react";

import { retailerTableColumnsConfig } from "./retailerTableColumnsConfig";
import { Table } from "../../../component/table/Table";
import { onOpen } from "../../../store/retailerActionModalSlice";
import { useDispatch } from "react-redux";

export const RetailerTablePage = ({ data }) => {
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
    setColumnDefs(retailerTableColumnsConfig["retailer"](handleOpenModal));
  }, [handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
