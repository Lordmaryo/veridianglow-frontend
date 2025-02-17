import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import SideBar from "./SideBar";
import { useAuthStore } from "../stores/useAuthStore";
import { capitalize } from "../utils/utils";
import AccountDropDown from "./AccountDropDown";
import { Lock } from "lucide-react";
import { Roles } from "../types/types";
import Cart from "./Cart";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === Roles.ADMIN;

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
          <IoMenu size={30} />
        </button>
        <div className="relative hidden lg:block">
          <FaMagnifyingGlass className="absolute left-2 bottom-2" />
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            className="outline-none pl-8 py-1 w-80 rounded-sm border border-zinc-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Link to={"/"}>
          <div className="sm:w-20 w-16">
            <img src="/logo.png" alt="logo" className="w-full h-full" />
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
              <MdOutlinePerson size={25} />
              <span>
                {user ? `Hi, ${capitalize(user.firstName)}` : "Account"}
              </span>
            </button>
          )}

          <Link
            to={"/about-us"}
            className="hidden lg:block hover:text-accent transition-colors"
          >
            About us
          </Link>

          <div className="flex gap-4 items-center">
            <button className="lg:hidden">
              <FaMagnifyingGlass size={23} />
            </button>
            <button
              className="relative"
              onClick={() => setToggleCart(!toggleCart)}
            >
              <div className="flex flex-row gap-1 items-center">
                <FiShoppingCart size={20} />
                <span>Cart</span>
              </div>
              <span className="font-bold flex justify-center items-center w-5 h-5 text-xs bg-accent text-textOnAccent absolute -top-2 -left-2 rounded-full">
                5
              </span>
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
    </>
  );
};

export default NavBar;
