import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useLocation, useParams } from "react-router-dom";


import { masterVariantTableColumnsConfig } from "./masterVariantTableColumnDef";
import { Table } from "../../../../component/table/Table";
import { onOpen } from "../../../../store/variantModalSlice";

export const MastersVariantTablePage = ({ data }) => {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [columnDefs, setColumnDefs] = useState([]);

  const brand = queryParams.get("brand");
  const model = queryParams.get("model");

  const dispatch = useDispatch();
  const handleOpenModal = useCallback(
    (rowData, action) => {
      // Step 1: Update modalData
      console.log("rowData :",rowData)
      dispatch(
        onOpen({
          id: rowData.id,
          action: action,
          brand,
          model,
          ram: rowData.ram,
          rom: rowData.rom,
          color: rowData.color,
        })
      );
    },
    [brand, dispatch, model]
  );


  useEffect(() => {
    setColumnDefs(
      masterVariantTableColumnsConfig[category](handleOpenModal)
    );
  }, [category, handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
