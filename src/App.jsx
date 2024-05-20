import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "./css/style.css";

// Import pages
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Clients from "./pages/Clients";
import Taxis from "./pages/Taxis";
import Transactions from "./pages/Transactions";
import BookTaxi from "./pages/BookTaxi";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Active from "./pages/Active";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<BookTaxi />} />
            <Route index path="/book-taxi" element={<BookTaxi />} />
            <Route index path="/active/:bookingId" element={<Active />} />
            <Route index path="/history" element={<History />} />
            <Route exact path="/clients" element={<Clients />} />
            <Route exact path="/taxis" element={<Taxis />} />
            <Route exact path="/transactions" element={<Transactions />} />
          </Route>

          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px", zIndex: 50 }}
          toastOptions={{
            duration: 5000,
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
