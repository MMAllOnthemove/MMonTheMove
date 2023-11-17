// External imports
import { useToast } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Custom imports
import { hhpNavItems, partsNavItems } from "../../../public/_data/navbar";
import logo from "../../../public/mmlogo.png";
import { logoutUserFunction } from "@/functions/getLoggedInUserProfile";

// Dynamic imports
const Button = dynamic(() => import("../Buttons"));
const ThemeChangerButton = dynamic(() => import("../Buttons/ThemeChanger"), {
  ssr: false,
});

const Navbar = () => {
  const [isOpen, setIsopen] = useState(false);
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };
  // Chakra ui toast
  const toast = useToast();
  const router = useRouter();
  const [hhpSubMenuOpen, setHHPSubMenuOpen] = useState(false);
  const [partsSubMenuOpen, sePartsSubMenuOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const getUserData = await res.json();

      setUserData(getUserData.email);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [userData]);

  const onSignout = async () => {
    // removeCookie("token");
    logoutUserFunction();
    router.push("/auth/");
    toast({
      title: "Logout successful",
      description: "Bye.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar_first_row bg-[#082f49]">
          {!userData || userData === "" ? (
            <p className=" dark:text-[#eee] text-[#eee] text-sm text-center">
              Please login
            </p>
          ) : (
            <p className=" dark:text-[#eee] text-[#eee] text-sm text-center">
              Logged in as{" "}
              <span className="text-sky-500 font-semibold">{userData}</span>
            </p>
          )}
        </div>
        <div className="navbar_second_row flex justify-between items-center py-2  px-4 dark:bg-[#15202B]">
          {!userData || userData === "" ? (
            <div />
          ) : (
            <button
              role="button"
              id="burger_menu"
              className="burger_menu"
              aria-label="burger_menu"
              onClick={ToggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="dark:fill-white"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
              </svg>
            </button>
          )}
          <div className="flex items-center gap-1">
            <ThemeChangerButton />
            <Link
              className="logo overflow-hidden flex justify-center items-center flex-col p-1"
              href="/"
            >
              <Image
                src={logo}
                alt="allelectronics logo"
                width={50}
                height={40}
                priority={true}
                placeholder="blur"
              />
            </Link>
          </div>
        </div>
      </nav>

      <aside
        className={`sidebar dark:bg-[#15202B] ${
          isOpen === true ? "active" : ""
        }`}
      >
        <div className="sd-header">
          <Link
            className="logo overflow-hidden flex justify-center items-center flex-col p-1"
            href="/"
          >
            <Image
              src={logo}
              alt="allelectronics logo"
              priority={true}
              placeholder="blur"
              style={{ objectFit: "cover" }}
            />
          </Link>
          <button
            role="button"
            id="close_button"
            className="btn close_button"
            onClick={ToggleSidebar}
            aria-label="close button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        </div>
        <div className="sd-body">
          <button
            className={`open-submenu-btn dark:text-[#eee] text-white font-semibold px-3 py-2 rounded-sm bg-[#082f49] w-full flex flex-row justify-between items-center`}
            onClick={() => setHHPSubMenuOpen(!hhpSubMenuOpen)}
          >
            <span>HHP</span>
            <span>
              {!hhpSubMenuOpen ? (
                <ChevronDownIcon className="h-6 w-6 text-white dark:text-[#eee]" />
              ) : (
                <ChevronUpIcon className="h-6 w-6 text-white dark:text-[#eee]" />
              )}
            </span>
          </button>
          {hhpSubMenuOpen && (
            <ul className="">
              {hhpNavItems.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item?.pageRoute}
                    className={`sd-link dark:text-[#eee] dark:hover:dark:text-[#eee]`}
                  >
                    {item?.item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            className={`open-submenu-btn dark:text-[#eee] text-white font-semibold px-3 py-2 rounded-sm bg-[#082f49] w-full flex flex-row justify-between items-center`}
            onClick={() => sePartsSubMenuOpen(!partsSubMenuOpen)}
          >
            <span>Parts</span>
            <span>
              {!partsSubMenuOpen ? (
                <ChevronDownIcon className="h-6 w-6 text-white dark:text-[#eee]" />
              ) : (
                <ChevronUpIcon className="h-6 w-6 text-white dark:text-[#eee]" />
              )}
            </span>
          </button>
          {partsSubMenuOpen && (
            <ul className="">
              {partsNavItems.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item?.pageRoute}
                    className={`sd-link dark:text-[#eee] dark:hover:dark:text-[#eee]`}
                  >
                    {item?.item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="login_details flex flex-col mt-auto px-[15px] absolute bottom-10 w-full">
          <Button
            type="button"
            className="bg-gray-900 text-md flex justify-center text-center text-white w-full mx-auto  rounded p-3 my-2"
            text="Logout"
            onClick={onSignout}
          />
        </div>
      </aside>
      <div
        className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
};

export default Navbar;
