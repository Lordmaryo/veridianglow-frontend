import { NavLink, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";

const UserAccount = () => {
  const { getWishlists, loadAddress } = useUserStore();

  useEffect(() => {
    loadAddress();
  }, []);

  useEffect(() => {
    getWishlists();
  }, [getWishlists]);

  return (
    <div className="md:flex ">
      <aside className="md:w-1/4 p-4 md:border-r w-full border-b">
        <nav>
          <ul className="space-y-4 font-semibold">
            <li className="hover:text-accent transition">
              <NavLink to="/customer/account" end>
                Account
              </NavLink>
            </li>
            <li className="hover:text-accent transition">
              <NavLink to="/customer/account/orders">Orders</NavLink>
            </li>
            <li className="hover:text-accent transition">
              <NavLink to="/customer/account/address">Address</NavLink>
            </li>
            <li className="hover:text-accent transition">
              <NavLink to="/customer/account/wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="md:w-3/4 p-4 h-screen mt-4 md:mt-0 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserAccount;
