import React, { useState } from "react";
import useGetSellerList from "../../tanstack-query/vrp/useGetSellerList";
import { SellerList } from "../../components/sellerList/SellerList";
import { SelectSkeleton } from "../../components/skeleton/selectSkeleton/SelectSkeleton";

export const SellerListPage = ({ sellerId, onFilter }) => {
  const [selectedSellerId, setSelectedSellerId] = useState(sellerId);

  const { data, isSuccess, isPending, isLoading } = useGetSellerList();

  const handleItemSelected = (itemId) => {
    setSelectedSellerId(itemId);
    onFilter(itemId);
  };

  return isSuccess ? (
    <SellerList
      sellers={data.data.data}
      onItemSelected={(itemId) => handleItemSelected(itemId)}
      sellerId={selectedSellerId}
    />
  ) : (
    <SelectSkeleton />
  );
};
