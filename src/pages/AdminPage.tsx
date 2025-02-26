import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";
import { IoMenu } from "react-icons/io5";
import { AdminSideBar } from "../components/AdminSideBar";
import { tabs, Tabs } from "../data/admin";
import { useAuthStore } from "../stores/useAuthStore";
import ProductList from "../components/ProductList";
import { useProductStore } from "../stores/useProductStore";
import OverviewTab from "../components/OverviewTab";
import ArchivedTab from "../components/ArchivedTab";
import OrdersTab from "../components/OrdersTab";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(Tabs.OVERVIEW);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const { logout } = useAuthStore();
  const { getAllProduct, products } = useProductStore();

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex">
        <aside className="bg-white z-50 hidden md:flex flex-col items-center border-r border-zinc-300 w-48 fixed left-0 top-0 h-screen">
          <Link to={"/"}>
            <div className="w-28">
              <img src="/logo.png" alt="logo" className="w-full" />
            </div>
          </Link>
          <ul className="w-full">
            <li className="space-y-2 gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="font-semibold flex gap-2 py-2 px-4 w-full hover:bg-accent transition"
                >
                  <tab.icon /> {tab.label}
                </button>
              ))}
            </li>
          </ul>
        </aside>
        <div className="md:ml-48 flex-1 py-2 px-4 min-h-screen max-w-[1070px]">
          <div className="z-20 md:pl-52 fixed top-0 left-0 w-full px-4 py-2 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden"
                onClick={() => setToggleSideBar(!toggleSideBar)}
              >
                <IoMenu size={25} />
              </button>
              <Link to={"/"} className="flex items-center gap-2 font-semibold">
                <ArrowLeft />
                <span>Store</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xl sm:text-2xl">
                <span className="text-accent">Admin</span> Dashboard
              </h1>
              <button
                className="hidden md:block text-red-500 hover:text-red-400 font-bold py-2 px-4 rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="pt-14 overflow-x-auto">
            {activeTab === Tabs.OVERVIEW && <OverviewTab />}
            {activeTab === Tabs.CREATE && <CreateProductForm />}
            {activeTab === Tabs.PRODUCTS && <ProductList products={products} />}
            {activeTab === Tabs.ARCHIVED && <ArchivedTab products={products} />}
            {activeTab === Tabs.ORDERS && <OrdersTab />}
            {/* {activeTab === Tabs.COUPON && <CouponTab />} */}
          </div>
        </div>
      </div>

      {toggleSideBar && (
        <div
          onClick={() => setToggleSideBar(false)}
          className={`z-[1000] bg-[#0000008d] fixed top-0 left-0 w-full h-screen transition-transform ${
            toggleSideBar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <AdminSideBar
            setToggleSideBar={setToggleSideBar}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </>
  );
};

export default AdminPage;
