import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../server/apiRegister";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      toast.success("Logged in successfully");

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
    login,
    isLoading,
  };
}
