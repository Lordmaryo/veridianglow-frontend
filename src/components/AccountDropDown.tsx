import { Link } from "react-router-dom";
import { UserResponse } from "../types/types";
import { Heart, House, ShoppingBag } from "lucide-react";
import { MdOutlinePerson } from "react-icons/md";

interface AccountDropDownProps {
  user: UserResponse | null;
  setToggleAccount: (toggleAccount: boolean) => void;
  logout: () => Promise<void>;
}

const AccountDropDown = ({
  user,
  setToggleAccount,
  logout,
}: AccountDropDownProps) => {
  const handleLogout = () => {
    logout();
    setToggleAccount(false);
  };

  return (
    <div className="w-52 p-4">
      {user ? (
        <div className="flex flex-col gap-4">
          <Link
            onClick={() => setToggleAccount(false)}
            to={"/customer/account"}
            className="flex gap-3 items-center hover:text-accent transition"
          >
            <MdOutlinePerson size={25} />
            <span>My Account</span>
          </Link>
          <Link
            onClick={() => setToggleAccount(false)}
            to={"/customer/"}
            className="flex gap-3 items-center hover:text-accent transition"
          >
            <ShoppingBag />
            <span>Orders</span>
          </Link>
          <Link
            onClick={() => setToggleAccount(false)}
            to={"/customer/"}
            className="flex gap-3 items-center hover:text-accent transition"
          >
            <House />
            <span>Address</span>
          </Link>
          <Link
            onClick={() => setToggleAccount(false)}
            to={"/customer/"}
            className="flex gap-3 items-center hover:text-accent transition"
          >
            <Heart />
            <span>Wishlist</span>
          </Link>
          <button
            onClick={handleLogout}
            className=" w-full py-1 bg-accent text-textOnAccent rounded-md
           hover:opacity-85 transition-opacity"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to={"/signin"}>
          <button
            onClick={() => setToggleAccount(false)}
            className=" w-full py-1 bg-accent text-textOnAccent rounded-md
           hover:opacity-85 transition-opacity"
          >
            SignIn
          </button>
        </Link>
      )}
    </div>
  );
};

export default AccountDropDown;
