import { Link } from "react-router-dom";
import { NavCategories } from "../data/category";
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Lock } from "lucide-react";
import { UserResponse } from "../types/userTypes";

interface SideBarProps {
  setToggleNav: (toggleNav: boolean) => void;
  logout: () => Promise<void>;
  user: UserResponse | null;
  isAdmin: boolean;
}

const SideBar = ({ setToggleNav, logout, user, isAdmin }: SideBarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    setToggleNav(false);
  };

  return (
    <div className="z-[1000] fixed top-0 left-0 w-full h-screen bg-white pt-2 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center px-4">
          <Link to={"/"} className="w-24">
            <img
              src="/logo.png"
              loading="lazy"
              alt="logo"
              className="w-full h-full"
            />
          </Link>
          <button onClick={() => setToggleNav(false)}>
            <ChevronRight size={25} />
          </button>
        </div>

        <ul className="flex flex-col gap-4 px-4 font-semibold">
          {NavCategories.map((category) => (
            <li key={category.href} className="flex flex-col">
              <div className="flex justify-between items-center">
                {category.subcategories ? (
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.name
                          ? null
                          : category.name
                      )
                    }
                    className="relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:bg-accent before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {category.name}
                  </button>
                ) : (
                  <Link
                    to={category.href}
                    className="relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:bg-accent before:transition-all before:duration-300 hover:before:w-full"
                    onClick={() => setToggleNav(false)}
                  >
                    {category.name}
                  </Link>
                )}
                {category.subcategories && (
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.name
                          ? null
                          : category.name
                      )
                    }
                  >
                    {expandedCategory === category.name ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                )}
              </div>

              {category.subcategories && expandedCategory === category.name && (
                <ul className="ml-4 mt-2 border-l pl-4 space-y-2">
                  {category.subcategories.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        to={sub.href}
                        className="block hover:text-accent transition"
                        onClick={() => setToggleNav(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 items-center p-4 border-t px-4">
        {user && !isAdmin && (
          <Link to={`/customer/account`}>
            <button
              onClick={() => setToggleNav(false)}
              className="flex flex-row items-center gap-2 bg-accent text-white rounded-md py-1 px-2 hover:opacity-90 transition-opacity"
            >
              <span>Your account</span>
            </button>
          </Link>
        )}
        {!user ? (
          <Link
            to={"/signin"}
            onClick={() => setToggleNav(false)}
            className="block font-semibold"
          >
            Login into your account
          </Link>
        ) : (
          <button onClick={handleLogout} className="block font-semibold p-4">
            Logout
          </button>
        )}
        {user && isAdmin && user?.isVerified && (
          <Link to={`/secrete-dashboard/admin`}>
            <button
              onClick={() => setToggleNav(false)}
              className="flex flex-row items-center gap-2 bg-accent text-white rounded-md py-1 px-2 hover:opacity-90 transition-opacity"
            >
              <Lock size={15} />
              <span>Dashboard</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
