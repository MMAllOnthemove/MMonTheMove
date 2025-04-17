import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import useUserLoggedIn from "@/hooks/useGetUser";
import useLogoutUser from "@/hooks/useLogout";
import { menuItems } from "@/lib/sidebar_links";
import { Bars4Icon } from "@heroicons/react/24/outline";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../assets/mmlogo.png";
const Navbar = dynamic(() => import('../navbar/page'), { ssr: false })

import useOtp from "@/hooks/useOtp";
import useSocket from "@/hooks/useSocket";
import { WifiIcon } from "@heroicons/react/24/outline";
const Sidebar = () => {
    const { isConnected } = useSocket()
    const { user } = useUserLoggedIn();
    const { logoutUser, logoutLoading } = useLogoutUser();
    const { otp } = useOtp();
    const [openDropdown, setOpenDropdown] = useState<null | boolean | number>(null);
    const [buttonLoading, setButtonLoading] = useState<null | boolean | number>(null);

    const toggleDropdown = (index: null | boolean | number) => {
        setOpenDropdown(openDropdown === index ? null : index);
        setButtonLoading(index);
        setTimeout(() => {
            setButtonLoading(null);
        }, 1000); // Remove loading state after 1 second
    };

    const logout = () => {
        logoutUser();
    };

    return (
        <div className="flex justify-between items-center navbar border px-2 z-10">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="outline-none bg-white border shadow-none hover:bg-white active:bg-white focus:bg-white border-none">
                        <Bars4Icon className="h-6 w-6 text-slate-800" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="overflow-hidden w-full text-sm text-left">
                            {user?.email}
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto z-10">
                        {menuItems.map((item, index) => (
                            <div key={index} className="py-2">
                                <Button
                                    className="cursor-pointer flex justify-between items-center w-full"
                                    onClick={() => toggleDropdown(index)}
                                    disabled={buttonLoading === index}
                                >
                                    <span>{item.label}</span>
                                    <span>
                                        {buttonLoading === index ? (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : openDropdown === index ? (
                                            "-"
                                        ) : (
                                            "+"
                                        )}
                                    </span>
                                </Button>
                                <div
                                    className={`overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${openDropdown === index ? "max-h-full" : "max-h-0"
                                        }`}
                                >
                                    {item.sublinks.map((sublink) => (
                                        <Link
                                            href={sublink.pageRoute}
                                            key={sublink.id}
                                            className={`p-2 text-sm hover:text-sky-600 my-1 border rounded-sm`}
                                        >
                                            {sublink.item}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button onClick={logout} disabled={logoutLoading}>
                                {logoutLoading ? "Logging out..." : "Logout"}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <div className="w-full hidden md:flex justify-between items-center">
                <Navbar />
                <div className="flex items-center gap-3">
                    <WifiIcon className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-400'}`} />
                    <p className="font-medium text-xs text-gray-900">
                        <span className="text-gray-500 font-semibold">OTP:</span>
                        {otp ? otp : ""}
                    </p>
                    <Link href="/" className="no-underline hover:no-underline cursor-pointer">
                        <Image
                            src={logo}
                            alt="MM ALL ELECTRONICS logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                    <a
                        href="/downloads/mmallelectronics_uploader.apk"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5 5-5M12 15V3" />
                        </svg>
                    </a>

                </div>

            </div >
        </div >
    );
};

export default Sidebar;