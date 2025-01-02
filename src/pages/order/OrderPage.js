import React from "react";
import { useSelector } from "react-redux";

import classes from "./orderPage.module.css";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import { OrderTablePage } from "./orderTable/OrderTablePage";
import { OrderFilterPage } from "./orderFilter/OrderFilterPage";
import { selectOrders, useGetOrdersListQuery } from "../../services/orderApiSlice";

export const OrderPage = () => {
  const { data, isSuccess } = useGetOrdersListQuery();

  const tableData = useSelector(selectOrders);

  return isSuccess ? (
    <div className={classes.box}>
      <OrderFilterPage />
      <OrderTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
