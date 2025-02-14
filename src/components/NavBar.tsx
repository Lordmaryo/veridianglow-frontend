import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import SideBar from "./SideBar";
import { useAuthStore } from "../stores/useAuthStore";
import { capitalize } from "../utils/utils";
import AccountDropDown from "./AccountDropDown";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const { user, logout } = useAuthStore();

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
          <button
            onClick={() => setToggleAccount(!toggleAccount)}
            className={`${
              toggleAccount ? "bg-[#00000080] rounded-md hover:text-black" : ""
            } px-4 py-2  hidden lg:flex items-center gap-1 hover:text-accent transition-colors`}
          >
            <MdOutlinePerson size={25} />
            <span>
              {user ? `Hi, ${capitalize(user.firstName)}` : "Account"}
            </span>
          </button>
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
            <button className="relative">
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
        <SideBar logout={logout} user={user} setToggleNav={setToggleNav} />
      </div>

      {toggleAccount && (
        <div className="shadow-2xl rounded-md z-10 bg-white absolute top-[5.5rem] right-[8rem]">
          <AccountDropDown
            user={user}
            logout={logout}
            setToggleAccount={setToggleAccount}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
