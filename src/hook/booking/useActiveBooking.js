import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../server/apiTaxi";
import { useParams } from "react-router-dom";

export function useActiveBooking() {
  const { bookingId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return {
    activeBooking: data,
    isLoading,
    isError,
  };
}
