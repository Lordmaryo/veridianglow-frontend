import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import { CartProducts, Roles } from "./types/types";
import { useCallback, useEffect, useRef } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import AdminPage from "./pages/AdminPage";
import ProductDetail from "./pages/ProductDetail";
import { useCartStore } from "./stores/useCartStore";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import NavCategory from "./pages/NavCategory";
import ForMen from "./pages/ForMen";
import ForKids from "./pages/ForKids";
import MenCategoryPage from "./pages/MenCategoryPage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./ErrorBoundry";
import UserAccount from "./pages/UserAccount";
import Account from "./components/Account";
import UserOrders from "./components/UserOrders";
import UserAddress from "./components/UserAddress";
import WishList from "./components/WishList";
import { useUserStore } from "./stores/useUserStore";
import debounce from "lodash/debounce";
import { isEqual } from "lodash";
import SearchResults from "./pages/SearchResults";
import CheckoutPage from "./pages/CheckoutPage";
import UserCoupon from "./components/UserCoupon";
import CartPage from "./pages/CartPage";
import PaymentFailed from "./pages/PaymentFailed";
import { usePaymentStore } from "./stores/usePaymentStore";
import PaymentSucess from "./pages/PaymentSuccess";
import VerifyPayment from "./pages/VerifyPayment";

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  const { cart, calculateTotals, syncCartToDatabase } = useCartStore();
  const { verifyPaymentResponse } = usePaymentStore(); // payment
  const { loadAddress, getWishlists } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const prevCartRef = useRef<CartProducts[]>(cart);

  const debouncedSyncCart = useCallback(
    debounce((cart: CartProducts[]) => syncCartToDatabase(cart), 2000), // 2s delay to update cart in database
    [syncCartToDatabase]
  );

  useEffect(() => {
    if (!user) return;

    // Only sync if the cart has actually changed
    if (!isEqual(prevCartRef.current, cart)) {
      debouncedSyncCart(cart);
      prevCartRef.current = cart;
    }
  }, [user, cart, debouncedSyncCart]);

  useEffect(() => {
    getWishlists();
  }, []);

  useEffect(() => {
    loadAddress();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotals();
    }
  }, []);

  return (
    <>
      <ErrorBoundary>
        <QueryProvider>
          {location.pathname !== "/secrete-dashboard/admin" && <Header />}
          <div className="pb-10">
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
                  user && user?.role === Roles.ADMIN && user?.isVerified ? (
                    <AdminPage />
                  ) : (
                    <Navigate to={"/"} />
                  )
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
              <Route
                path="/shop/category/:category"
                element={<CategoryPage />}
              />
              <Route
                path="/for-men/:menCategory"
                element={<MenCategoryPage />}
              />
              <Route
                path="/category/:mainCategory/:otherCategory?"
                element={<NavCategory />}
              />
              <Route path="/for-men" element={<ForMen />} />
              <Route path="/for-kids" element={<ForKids />} />
              <Route path="/shop" element={<Shop />} />
              {/* User Account Routes */}
              {user && (
                <Route path="/customer/account/*" element={<UserAccount />}>
                  <Route index element={<Account />} />
                  <Route path="orders" element={<UserOrders />} />
                  <Route path="address" element={<UserAddress />} />
                  <Route path="wishlist" element={<WishList />} />
                  <Route path="coupon" element={<UserCoupon />} />
                </Route>
              )}
              <Route path="*" element={<NotFound />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<CartPage />} />
              {user && (
                <Route
                  path="/order/payment-failed"
                  element={<PaymentFailed />}
                />
              )}
              {user && verifyPaymentResponse && (
                <Route
                  path="/order/payment-success"
                  element={<PaymentSucess />}
                />
              )}
              <Route
                path="/payment/verify-payment"
                element={<VerifyPayment />}
              />
              {!checkingAuth && (
                <Route
                  path="/checkout"
                  element={user ? <CheckoutPage /> : <Navigate to="/" />}
                />
              )}
            </Routes>
          </div>
          {location.pathname !== "/secrete-dashboard/admin" &&
            location.pathname !== "/otp-verification" && <Footer />}
          <Toaster />
        </QueryProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
