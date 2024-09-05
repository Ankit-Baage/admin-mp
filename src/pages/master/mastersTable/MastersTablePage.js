import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mastersTableColumnsConfig } from "./mastersTableColumnDef";
import { useParams } from "react-router-dom";
import { Table } from "../../../component/table/Table";

export const MastersTablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
  const handleOpenModal = useCallback(
    (rowData, action) => {
      // Step 1: Update modalData
      // dispatch(
      //   onOpen({
      //     id: rowData.id,
      //     action,
      //     category: rowData.category,
      //     categoryLabel: rowData.categoryLabel,
      //     page: rowData.page,
      //     url: rowData.url,
      //     media_type: rowData.media_type,
      //     urlLabel: rowData.urlLabel,
      //     sequence: rowData.sequence,
      //   })
      // );
    },
    [dispatch]
  );

  const handleOpenView = useCallback(
    (rowData) => {
      console.log(rowData);
      // dispatch(
      //   openMedia({
      //     url: rowData.url,
      //     media_type: rowData.media_type,
      //   })
      // );
    },
    [dispatch]
  );

  useEffect(() => {
    setColumnDefs(
      mastersTableColumnsConfig[category](handleOpenModal, handleOpenView)
    );
  }, [category, handleOpenModal, handleOpenView]);

  return <Table data={data} columns={columnDefs} />;
};
