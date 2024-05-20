import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";
import Loader from "../utils/Loader";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
