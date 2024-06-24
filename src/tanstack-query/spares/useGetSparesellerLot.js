import { useQuery } from "@tanstack/react-query";

import { spareSellerLotRequest } from "../../utils/https-request/spares/spareSellerLotRequest";

function useGetSpareSellerLot(seller_id, lot_id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["spareSellerPriorityLotList", seller_id, lot_id],
    queryFn: () => spareSellerLotRequest({ seller_id, lot_id }),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
    enabled: !!seller_id && !!lot_id,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSpareSellerLot;
