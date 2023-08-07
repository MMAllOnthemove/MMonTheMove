import { Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import avi from "../public/images/4.jpg";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      {/* The navbar */}

      <header className="flex justify-between items-center px-3 py-4 border-b border-b-slate-100 fixed top-0 w-full bg-white z-10 h-24">
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
        {/* Profile dropdown */}
        <div className="profile_dropdown w-56 text-right">
          <Menu as="div" className="relative inline-block text-left z-10">
            <div>
              <Menu.Button className="inline-flex w-full justify-center avi">
                <img
                  src={`${session?.user?.image}`}
                  alt="user avatar"
                  placeholder="blur"
                />
              </Menu.Button>
            </div>
            <Menu.Items className="flex flex-col absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md focus:outline-none">
              <Menu.Item>
                <span className="p-2 font-sans text-slate-900  text-left font-medium text-sm">
                  {session?.user?.name}
                </span>
              </Menu.Item>
              <Menu.Item>
                <span className="p-2 font-sans text-slate-900  text-left font-medium text-sm">
                  {session?.user?.email}
                </span>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/dashboard"
                  className="cursor-pointer p-2 font-sans text-slate-900 text-left font-medium text-sm"
                >
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/report"
                  className="cursor-pointer p-2 font-sans text-slate-900 text-left font-medium text-sm"
                >
                  Report a problem
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer p-2 font-sans text-slate-900 text-left font-medium text-sm"
                >
                  Logout
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>
    </>
  );
}
