import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navitems } from "../public/_data/navbar";
import Link from "next/link";
import { AccountContext } from "@/state/AccountContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, setUser } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  // console.log(user);
  // console.log(user?.loggedIn);
  const router = useRouter();
  const logOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_LOGOUT}`).then(
      (res) => res.json()
    );
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setUser({ loggedIn: false });
    router.push("/login");
  };
  // State for mobile open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      {/* The navbar */}
      <nav
        className="flex navbar items-center justify-between shadow-sm p-6 lg:px-8 z-10"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <svg
              id="logo-15"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
            </svg>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navitems.map((item) => (
            <Link
              key={item.id}
              href={item.pageRoute}
              className="text-base font-semibold leading-6 text-gray-900"
            >
              {item.item}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user?.loggedIn === true ? (
            <button type="button" onClick={logOut}>
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      {/* This is the mobile navigation */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <svg
                id="logo-15"
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                  className="ccustom"
                  fill="#17CF97"
                ></path>{" "}
                <path
                  d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                  className="ccustom"
                  fill="#17CF97"
                ></path>{" "}
                <path
                  d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                  className="ccustom"
                  fill="#17CF97"
                ></path>{" "}
                <path
                  d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                  className="ccustom w-auto"
                  fill="#17CF97"
                ></path>{" "}
              </svg>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navitems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.pageRoute}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.item}
                  </Link>
                ))}
              </div>
              <div className="py-3">
                {user?.loggedIn === true ? (
                  <button type="button" onClick={logOut}>
                    Logout
                  </button>
                ) : (
                  <Link
                    href={"/login"}
                    className="block rounded-lg py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
