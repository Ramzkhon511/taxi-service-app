import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "../../server/apiAdmin";

export function useDrivers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  return {
    drivers: data,
    isLoading,
    isError,
  };
}
