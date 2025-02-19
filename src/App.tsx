import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import AdminPage from "./pages/AdminPage";
import ProductDetail from "./pages/ProductDetail";
import { useCartStore } from "./stores/useCartStore";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  const { cart, calculateTotals } = useCartStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotals();
    }
  }, []);
  
  // if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <QueryProvider>
        <div>
          {location.pathname !== "/secrete-dashboard/admin" && <Header />}

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
            <Route
              path={`/secrete-dashboard/admin`}
              element={
                // user && user?.role === Roles.ADMIN && user?.isVerified ? (
                <AdminPage />
                // ) : (
                //   <Navigate to={"/"} />
                // )
              }
            />
            <Route
              path="/otp-verification"
              element={
                user?.role === Roles.ADMIN && !user?.isVerified ? (
                  <OtpVerification />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/shop/:productSlug" element={<ProductDetail />} />
            <Route path="/shop/category/:category" element={<CategoryPage />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
        <Toaster />
      </QueryProvider>
    </>
  );
}

export default App;
