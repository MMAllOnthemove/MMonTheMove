// External imports
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
// Custom imports
import { logoutUserFunction } from "@/functions/getLoggedInUserProfile";
import { fetchCurrentUser, fetchOTP } from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// Dynamic imports
const Button = dynamic(() => import("../Buttons"));
const ThemeChangerButton = dynamic(() => import("../Buttons/ThemeChanger"), {
  ssr: false,
});

const menuItems = [
  {
    label: 'HHP',
    sublinks: [
      { id: 1, item: "Home", pageRoute: "/" },
      { id: 2, item: "Dashboard", pageRoute: "/department/hhp/dashboard" },
      { id: 3, item: "Bookings report", pageRoute: "/department/hhp/reports" }],
  },
  {
    label: 'Claims',
    sublinks: [{ id: 4, item: "Home", pageRoute: "/department/claims" },],
  },
  {
    label: 'Parts',
    sublinks: [{ id: 5, item: "Part search", pageRoute: "/department/parts/parts-search" },
    { id: 6, item: "Parts", pageRoute: "/department/parts" },],
  },
];
const Navbar = () => {
  const [isOpen, setIsopen] = useState(false);


  const router = useRouter()

  const { userData } = fetchCurrentUser();
  const { getOTP } = fetchOTP();
  const onSignout = async () => {
    // removeCookie("token");
    logoutUserFunction();
    router.push("/auth/");
    toast.success("Logged out");
  };
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleDropdown = (index: null | any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <div className="relative z-10">
      <button
        className="m-4 p-2 bg-blue-500 text-white rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      <aside
        className={`bg-gray-800 text-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 h-screen fixed top-0 left-0 flex flex-col`}
      >
        <div className="p-4 text-lg font-semibold flex justify-between items-center">
          <span>Dashboard</span>
          <button onClick={toggleSidebar} className="text-lg font-normal text-[#eee]">×</button>
        </div>
        <div className="flex-1 overflow-y-auto z-10">
          {menuItems.map((item, index) => (
            <div key={index} className="px-4 py-2">
              <div
                className="cursor-pointer flex justify-between items-center text-[#eee]"
                onClick={() => toggleDropdown(index)}
              >
                <span>{item.label}</span>
                <span>{openDropdown === index ? '-' : '+'}</span>
              </div>
              <div
                className={`overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${openDropdown === index ? 'max-h-full' : 'max-h-0'}`}
              >
                {item.sublinks.map((sublink, subIndex) => (
                  <Link href={sublink.pageRoute} key={sublink.id} className={`pl-2 py-1 text-sm text-[#eee] hover:text-sky-600 my-1`}>
                    {sublink.item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700 relative">
          <div>
            <button
              onClick={toggleUserDropdown}
              className="w-full text-left flex items-center justify-between text-sm text-[#eee]"
            >
              <span className="overflow-hidden">{userData?.email}</span> <span>
                <EllipsisVerticalIcon className="h-4 w-4 text-blue-500" />
              </span>
            </button>
            {isUserDropdownOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-gray-800 border border-gray-700">
                <button className="w-full text-left px-4 py-2 text-[#eee] hover:bg-gray-700">Profile</button>
                <button className="w-full text-left px-4 py-2 text-[#eee] hover:bg-gray-700">Settings</button>
                <button className="w-full text-left px-4 py-2 text-[#eee] hover:bg-gray-700">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div >
  );
};

export default Navbar;
