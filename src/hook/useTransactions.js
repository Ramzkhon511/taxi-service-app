import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../server/apiAdmin";

export function useTransactions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return {
    transactions: data,
    isLoading,
    isError,
  };
}
