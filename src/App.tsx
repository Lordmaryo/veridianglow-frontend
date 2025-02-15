import { Navigate, Route, Routes } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Roles } from "./types/types";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) return <LoadingSpinner />;
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
                ) : user?.role === Roles.ADMIN && !user.isVerified ? (
                  <Navigate to={"/otp-verification"} />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:token"
              element={!user ? <ResetPassword /> : <Navigate to="/" />}
            />
          </Routes>
          {/* <Route
            path="/otp-verification"
            element={
              user?.role === Roles.ADMIN && !user?.isVerified ? (
                <OtpVerification />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
        </div>
        <Toaster />
      </QueryProvider>
    </>
  );
}

export default App;
