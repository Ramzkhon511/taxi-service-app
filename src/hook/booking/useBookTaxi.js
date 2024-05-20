import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../server/apiTaxi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useBookTaxi() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBookingMutation, isLoading: isCreating } = useMutation({
    mutationFn: (booking) => createBooking(booking),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success(
        "Taxi has been booked, please wait for the driver to accept"
      );

      navigate(`/active/${data[0].id}`);
    },
    onError: (error) => {
      toast.error("Failed to book taxi");
    },
  });

  return {
    bookTaxi: createBookingMutation,
    isCreating,
  };
}
