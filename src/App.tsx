import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useCallback, useEffect, useRef } from "react";
import QueryProvider from "./QueryProvider";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Roles } from "./types/types";
import { useCartStore } from "./stores/useCartStore";
import { useUserStore } from "./stores/useUserStore";
import { usePaymentStore } from "./stores/usePaymentStore";
import debounce from "lodash/debounce";
import { isEqual } from "lodash";
import ErrorBoundary from "./ErrorBoundry";
import WhatsAppButton from "./components/WhatsappButton";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Eagerly loaded components
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import ForMen from "./pages/ForMen";
import ForKids from "./pages/ForKids";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { CartProducts } from "./types/CartTypes";

// Lazily loaded secondary components
const OtpVerification = lazy(() => import("./pages/OtpVerification"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const Account = lazy(() => import("./components/Account"));
const UserOrders = lazy(() => import("./components/UserOrders"));
const UserAddress = lazy(() => import("./components/UserAddress"));
const WishList = lazy(() => import("./components/WishList"));
const UserCoupon = lazy(() => import("./components/UserCoupon"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
const FAQs = lazy(() => import("./pages/FAQs"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const VerifyPayment = lazy(() => import("./pages/VerifyPayment"));
const NavCategory = lazy(() => import("./pages/NavCategory"));
const MenCategoryPage = lazy(() => import("./pages/MenCategoryPage"));
const NavSubCategory = lazy(() => import("./pages/NavSubCategory"));

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  const { cart, calculateTotals, syncCartToDatabase } = useCartStore();
  const { verifyPaymentResponse } = usePaymentStore();
  const { loadAddress, getWishlists } = useUserStore();
  const location = useLocation();

  const prevCartRef = useRef<CartProducts[]>(cart);
  const debouncedSyncCart = useCallback(
    debounce((cart: CartProducts[]) => syncCartToDatabase(cart), 2000),
    [syncCartToDatabase]
  );

  useEffect(() => {
    if (!user) checkAuth();
    getWishlists();
    loadAddress();
    if (cart.length > 0) calculateTotals();
  }, [user, cart]);

  useEffect(() => {
    if (user && !isEqual(prevCartRef.current, cart)) {
      debouncedSyncCart(cart);
      prevCartRef.current = cart;
    }
  }, [user, cart, debouncedSyncCart]);

  return (
    <>
      <ErrorBoundary>
        <QueryProvider>
          {location.pathname !== "/secrete-dashboard/admin" && <Header />}
          <div className="pb-10 min-h-screen">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/signin"
                  element={!user ? <SignInPage /> : <Navigate to={"/"} />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/frequently-asked-questions" element={<FAQs />} />
                <Route
                  path="/reset-password/:token"
                  element={!user ? <ResetPassword /> : <Navigate to="/" />}
                />
                <Route
                  path="/secrete-dashboard/admin"
                  element={
                    user?.role === Roles.ADMIN ? (
                      <AdminPage />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/otp-verification"
                  element={!user ? <OtpVerification /> : <Navigate to="/" />}
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
                  path="/category/:mainCategory"
                  element={<NavCategory />}
                />
                <Route
                  path="/category/:mainCategory/:otherCategory"
                  element={<NavSubCategory />}
                />
                <Route path="/for-men" element={<ForMen />} />
                <Route path="/for-kids" element={<ForKids />} />
                <Route path="/shop" element={<Shop />} />
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
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {user && (
                  <Route
                    path="/order/payment-failed"
                    element={<PaymentFailed />}
                  />
                )}
                {user && verifyPaymentResponse && (
                  <Route
                    path="/order/payment-success"
                    element={<PaymentSuccess />}
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
            </Suspense>
          </div>
          {location.pathname !== "/secrete-dashboard/admin" && <Footer />}
          <Toaster />
          {user?.role !== Roles.ADMIN && <WhatsAppButton />}
        </QueryProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
