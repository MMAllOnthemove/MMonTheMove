import {
    Breadcrumb,
    BreadcrumbEllipsis,
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
import { menuItems } from "@/lib/sidebar_links"
import React from "react"

export default function Navbar() {
    return (

        <Breadcrumb>
            <BreadcrumbList>
                {/* Dynamic Breadcrumb Items with Dropdowns */}
                {menuItems.map((menu) => (
                    <React.Fragment key={menu.label}>
                        <BreadcrumbItem >
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 outline-none border-none">
                                    <span>{menu.label}</span>
                                    <BreadcrumbEllipsis className="h-4 w-4" />
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
                        <BreadcrumbSeparator className="list-none" />
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
