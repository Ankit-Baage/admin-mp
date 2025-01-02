import React, { useEffect, useState } from "react";

import { retailerTableColumnsConfig } from "./retailerTableColumnsConfig";
import { Table } from "../../../component/table/Table";

export const RetailerTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs(retailerTableColumnsConfig["retailer"]);
  }, []);

  return <Table data={data} columns={columnDefs} />;
};
