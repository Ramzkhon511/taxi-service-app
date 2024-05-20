import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../server/apiTaxi";

export function useBooking() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getBookings,
  });

  return {
    bookingHistory: data,
    isLoading,
    isError,
  };
}
