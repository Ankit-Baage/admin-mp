import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../component/table/Table";

import { mastersTableColumnsConfig } from "./mastersTableColumnDef";
import {
  selectMastersVariantState,
  setVariantFilters,
} from "../../../store/mastersVariantFilterSlice";

export const MastersTablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);
  const masterVariantState = useSelector(selectMastersVariantState);
  const navigate = useNavigate();
 

  const dispatch = useDispatch();
  const handleVariant = useCallback(
    (rowData) => {
      console.log(rowData);

      dispatch(
        setVariantFilters({
          brand: rowData.brand,
          model: rowData.model,
        })
      );
      const queryParams = new URLSearchParams({
        brand: rowData.brand,
        model: rowData.model,
      }).toString();
      navigate(`variants?${queryParams}`);

    },
    [dispatch, navigate]
  );

  useEffect(() => {
    setColumnDefs(mastersTableColumnsConfig[category](handleVariant));
  }, [category, handleVariant]);

  return <Table data={data} columns={columnDefs} />;
};
