import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { advertisementTableColumnsConfig } from "./advertisementTableColumnDef";
import { Table } from "../../../component/table/Table";
import {  onOpen, setIsOpen } from "../../../store/advertisementActionModalSlice";
import { openMedia } from "../../../store/mediaPreviewSlice";
import { openModal } from "../../../store/modalSlice";

export const AdvertisementTablePage = ({ data, moduleList, pageList }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();

  const handleOpenModal = useCallback(
    (rowData, identifier) => {
      console.log(identifier)
      dispatch(
        openModal({
          component: "DynamicForm",
          uiData: {
            heading: `${identifier} Advertisement`,
            primaryButtonLabel: identifier,
            isGridRequired: true
          },
          configData: {
            ...rowData,
            moduleList,
            pageList,
            identifier
          },
          operationType: identifier,
          module: "advertisement"
        })
      );
    },
    [dispatch, moduleList, pageList]
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
