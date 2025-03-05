import { Link } from "react-router-dom";
import { Tabs, tabs } from "../data/admin";
import { ChevronRight } from "lucide-react";

interface SideBarProps {
  setToggleSideBar: (toggleSideBar: boolean) => void;
  setActiveTab: (value: Tabs) => void;
}

export const AdminSideBar = ({
  setToggleSideBar,
  setActiveTab,
}: SideBarProps) => {
  return (
    <div className="z-[1000] fixed top-0 left-0 w-52 min-h-screen bg-white pt-2 flex flex-col justify-between">
      <div className="flex flex-col items-center h-screen">
        <div className="w-full mb-6 flex justify-between items-center px-4">
          <Link to={"/"} className="w-16">
            <img src="/logo.png" alt="logo" loading="lazy" className="w-full h-full" />
          </Link>
          <button onClick={() => setToggleSideBar(false)}>
            <ChevronRight size={25} />
          </button>
        </div>
        <ul className="w-full">
          <li
            className="space-y-2 gap-4"
            onClick={() => setToggleSideBar(false)}
          >
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
      </div>
    </div>
  );
};
