import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { Table } from "../../../component/table/Table";

import { mastersVrpTableColumnsConfig } from "./mastersVrpTableColumnDef";
import { onOpen } from "../../../store/mastersVrpActionModalSlice";

export const MastersVrpTablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
  const handleOpenModal = useCallback(
    (rowData, action) => {
      // Step 1: Update modalData
      console.log(action)
      dispatch(
        onOpen({
          id: rowData.id,
          action: action,
          brand: rowData.brand,
          model: rowData.model,
          ram: rowData.ram,
          rom: rowData.rom,
          color: rowData.color,
          modifiedBrand: rowData.modifiedBrand,
          modifiedModel: rowData.modifiedModel,
          modifiedRam: rowData.modifiedRam,
          modifiedRom: rowData.modifiedRom,
          modifiedColor: rowData.modifiedColor,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setColumnDefs(mastersVrpTableColumnsConfig["vrp"](handleOpenModal));
  }, [handleOpenModal]);

  return <Table data={data} columns={columnDefs} />;
};
