import { useQuery } from "@tanstack/react-query";
import { spareSellerLotListRequest } from "../../utils/https-request/spares/spareSellerLotListRequest";

function useGetPriorityLotList(seller_id) {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["spareSellerPriorityLotList", seller_id],
    queryFn: () => spareSellerLotListRequest({ seller_id }),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
    enabled: !!seller_id
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetPriorityLotList;
