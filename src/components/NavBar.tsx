import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { useAuthStore } from "../stores/useAuthStore";
import { capitalize } from "../utils/utils";
import AccountDropDown from "./AccountDropDown";
import { Lock, ShoppingCart, Search, UserRound, Menu } from "lucide-react";
import { Roles } from "../types/types";
import Cart from "./Cart";
import { useCartStore } from "../stores/useCartStore";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === Roles.ADMIN;
  const location = useLocation();

  useEffect(() => {
    if (toggleCart) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggleCart]);

  return (
    <>
      <div className="flex flex-row justify-between items-center px-4 bg-background">
        <button className="lg:hidden" onClick={() => setToggleNav(!toggleNav)}>
          <Menu size={30} />
        </button>
        <div className="hidden lg:block w-80">
          <SearchBar />
        </div>
        <Link to={"/"}>
          <div className="sm:w-20 w-16">
            <img
              src="/logo.png"
              alt="logo"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user && isAdmin && user?.isVerified ? (
            <Link to={`/secrete-dashboard/admin`}>
              <button className="hidden lg:flex flex-row items-center gap-2 bg-accent text-white rounded-md py-1 px-2 hover:opacity-90 transition-opacity">
                <Lock size={15} />
                <span>Dashboard</span>
              </button>
            </Link>
          ) : (
            <button
              onClick={() => setToggleAccount(!toggleAccount)}
              className={`${
                toggleAccount
                  ? "bg-[#00000080] rounded-md hover:text-black"
                  : ""
              } px-4 py-2 hidden lg:flex items-center gap-1 hover:text-accent transition-colors`}
            >
              <UserRound size={20} />
              <span>
                {user ? `Hi, ${capitalize(user.firstName)}` : "Account"}
              </span>
            </button>
          )}

          {!user ? (
            <Link
              to={"/frequently-asked-questions"}
              className="hidden lg:block hover:text-accent transition-colors"
            >
              FAQs
            </Link>
          ) : (
            <Link
              className="hidden lg:block hover:text-accent transition-colors"
              to={"/customer/account/wishlist"}
            >
              Wishlists
            </Link>
          )}

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setToggleSearch(!toggleSearch)}
              className="lg:hidden"
            >
              <Search size={23} />
            </button>
            <button
              className="relative"
              onClick={() => {
                if (
                  location.pathname === "/checkout" ||
                  location.pathname === "/cart"
                ) {
                  window.location.href = "/cart";
                } else {
                  setToggleCart(!toggleCart);
                }
              }}
            >
              <div className="flex flex-row gap-1 items-center">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </div>
              {cart.length > 0 && (
                <span className="font-bold flex justify-center items-center w-5 h-5 text-xs bg-accent text-textOnAccent absolute -top-2 -left-2 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen transition-transform ${
          toggleNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SideBar
          logout={logout}
          user={user}
          isAdmin={isAdmin}
          setToggleNav={setToggleNav}
        />
      </div>
      {toggleAccount && (
        <>
          <div
            onClick={() => setToggleAccount(false)}
            className="bg-[#0000008d] w-full h-screen fixed top-0"
          />
          <div className="shadow-2xl rounded-md z-10 bg-white absolute top-[5.5rem] right-[8rem]">
            <AccountDropDown
              user={user}
              logout={logout}
              setToggleAccount={setToggleAccount}
            />
          </div>
        </>
      )}
      {toggleCart && (
        <div
          className={`z-20 bg-[#0000008d] fixed top-0 right-0 w-full h-screen transition-transform ${
            toggleCart ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <>
            <div
              onClick={() => setToggleCart(false)}
              className="bg-[#0000008d] w-full h-screen fixed top-0 left-0 overflow-hidden"
            />
            <Cart setToggleCart={setToggleCart} />
          </>
        </div>
      )}
      {toggleSearch && (
        <div className="absolute top-24 left-0 w-full z-20">
          <SearchBar setToggleSearch={setToggleSearch} />
          <div
            onClick={() => setToggleSearch(false)}
            className="bg-[#000000bf] h-screen w-full"
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
