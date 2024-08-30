import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { advertisementTableColumnsConfig } from "./advertisementTableColumnDef";
import { Table } from "../../../component/table/Table";
import { onOpen } from "../../../store/advertisementActionModalSlice";
import { openMedia } from "../../../store/mediaPreviewSlice";

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
          media_type: rowData.media_type,
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
        openMedia({
          url: rowData.url,
          media_type: rowData.media_type
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
