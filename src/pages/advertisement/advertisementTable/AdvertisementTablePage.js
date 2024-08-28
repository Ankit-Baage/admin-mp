import React, { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { advertisementTableColumnsConfig } from "./advertisementTableColumnDef";
import { Table } from "../../../component/table/Table";
import { onOpen } from "../../../store/advertisementActionModalSlice";
import { openImage } from "../../../store/imagePreviewSlice";

export const AdvertisementTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
  const handleOpenModal = useCallback(
    (rowData, action) => {
      console.log(rowData);
      dispatch(
        onOpen({
          id: rowData.id,
          action,
          category: rowData.category,
          categoryLabel: rowData.categoryLabel,
          page: rowData.page,
          url: rowData.url,
          mediaType: rowData.media_type,
          urlLabel: rowData.urlLabel,
          sequence: rowData.sequence,
        })
      );
    },
    [dispatch]
  );
  const handleOpenView = useCallback(
    (rowData) => {
      console.log(rowData);
      dispatch(
        openImage({
          url: rowData.url,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setColumnDefs(
      advertisementTableColumnsConfig["advertisement"](handleOpenModal,handleOpenView)
    );
  }, [handleOpenModal, handleOpenView]);

  return <Table data={data} columns={columnDefs} />;
};
