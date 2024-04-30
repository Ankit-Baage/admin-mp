import { useQuery, useQueryClient } from "@tanstack/react-query";
import { vrpRequest } from "../../utils/https-request/vrp/VrpRequest";

function useGetVrp(filters) {
  const queryClient = useQueryClient();
  const { data, isError, isLoading, isSuccess,refetch } = useQuery({
    queryKey: ["vrp", filters],
    queryFn: () => vrpRequest(filters),
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetVrp;
