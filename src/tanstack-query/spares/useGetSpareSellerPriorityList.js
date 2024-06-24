import { useQuery } from "@tanstack/react-query";
import { spareSellerPriorityListRequest } from "../../utils/https-request/spares/spareSellerPriorityListRequest";



function useGetSpareSellerPriorityList() {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["spareSellerPriorityList"],
    queryFn: spareSellerPriorityListRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetSpareSellerPriorityList;
