import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUserLoggedIn from "@/hooks/useGetUser"
import { menuItems } from "@/lib/sidebar_links"
import { ChevronDownIcon, SlashIcon, } from "@heroicons/react/24/outline"
import React, { useState } from "react"

const Navbar = () => {
    // customize open on hover
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const { user } = useUserLoggedIn()
    const isAdmin = user?.user_role === "admin" || user?.user_role === "manager" // Assuming you have a role property in your user object

    return (

        <Breadcrumb>
            <BreadcrumbList>
                {/* Dynamic Breadcrumb Items with Dropdowns */}
                {menuItems.filter((menu) => !menu.label.includes("Admin") || isAdmin).map((menu) => (
                    <React.Fragment key={menu.label}>
                        <BreadcrumbItem onMouseEnter={() => setHoveredMenu(menu.label)}
                            onMouseLeave={() => setHoveredMenu(null)}>
                            <DropdownMenu open={hoveredMenu === menu.label}>
                                <DropdownMenuTrigger className="flex items-center gap-1 outline-none border-none">
                                    <span>{menu.label}</span>
                                    <ChevronDownIcon className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {menu.sublinks.map((sublink) => (
                                        <DropdownMenuItem key={sublink.id} asChild>
                                            <a href={sublink.pageRoute}>{sublink.item}</a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="list-none" >
                            <SlashIcon className="h-4 w-4" />
                        </BreadcrumbSeparator>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default Navbar