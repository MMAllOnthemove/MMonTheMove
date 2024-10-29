"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import useUserLoggedIn from '@/hooks/useGetUser'
import useLogoutUser from '@/hooks/useLogout'
import { menuItems } from '@/lib/sidebar_links'
import { Bars4Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from "../../assets/mmlogo.png"

const Sidebar = () => {
    const { user } = useUserLoggedIn()
    const { logoutUser, logoutLoading } = useLogoutUser()

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index: null | unknown) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const logout = () => {
        logoutUser()
    }

    return (
        <div className="flex justify-between items-center navbar border px-2">

            <Sheet>
                <SheetTrigger asChild>
                    <Button className='outline-none bg-white border shadow-none hover:bg-white active:bg-white focus:bg-white border-none'><Bars4Icon className="h-6 w-6 text-slate-800" /></Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="overflow-hidden w-full text-sm text-left">{user?.email}</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto z-10">
                        {menuItems.map((item, index) => (
                            <div key={index} className="py-2">
                                <Button
                                    className="cursor-pointer flex justify-between items-center w-full"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <span>{item.label}</span>
                                    <span>{openDropdown === index ? '-' : '+'}</span>
                                </Button>
                                <div
                                    className={`overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${openDropdown === index ? 'max-h-full' : 'max-h-0'}`}
                                >
                                    {item.sublinks.map((sublink) => (
                                        <Link href={sublink.pageRoute} key={sublink.id} className={`p-2 text-sm hover:text-sky-600 my-1 border rounded-sm`}>
                                            {sublink.item}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}


                    </div>
                    <SheetFooter>
                        <SheetClose asChild>

                            <Button onClick={logout} disabled={logoutLoading}>{logoutLoading ? 'Logging out...' : 'Logout'}</Button>

                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <nav>
                <div>
                    <Image
                        src={logo}
                        alt="MM ALL ELECTRONICS logo"
                        width={100}
                        height={100}
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                    />
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
