import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../../server/apiRegister";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, status } = useMutation({
    mutationFn: (credentials) => registerUser(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      toast.success("Welcome to the app");

      navigate("/book-taxi", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again"
      );
    },
  });

  const isLoading = status === "pending";

  return {
    register,
    isLoading,
  };
}
