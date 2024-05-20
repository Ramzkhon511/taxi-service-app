import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../../server/apiRegister";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);

      toast.success("Logged out successfully");

      navigate("/sign-in", { replace: true });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return {
    logout,
    isLoading,
  };
}
