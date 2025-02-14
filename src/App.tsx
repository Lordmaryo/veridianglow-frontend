import { Navigate, Route, Routes } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Roles } from "./types/types";
import { useEffect } from "react";

function App() {
  const { user, checkingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <QueryProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={"/signin"}
              element={
                !user ? (
                  <SignInPage />
                ) : user.role === Roles.ADMIN && !user.isVerified ? (
                  <Navigate to={"/otp-verification"} />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
          </Routes>
        </div>
        <Toaster />
      </QueryProvider>
    </>
  );
}

export default App;
