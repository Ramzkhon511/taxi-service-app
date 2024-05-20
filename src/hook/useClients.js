import { useQuery } from "@tanstack/react-query";
import { getDrivers, getUsers } from "../server/apiAdmin";

export function useClients() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    clients: data,
    isLoading,
    isError,
  };
}
