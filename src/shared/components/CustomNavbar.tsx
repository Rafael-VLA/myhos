'use client'

import { FC, PropsWithChildren, useMemo, useState } from "react";
import Link from "next/link"
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar"
import { AppLogo } from "./ui/AppLogo"
import { DataLink } from "@/shared/interfaces/link";
import { usePathname } from "next/navigation";

const menuItemsT: DataLink[] = [
    {
        label: "Iniciar Sesión",
        href: "/auth/login"
    }
]

interface Props extends PropsWithChildren {
    menuItems?: DataLink[]
}

export const CustomNavbar: FC<Props> = ({ menuItems = menuItemsT, children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const pathname = usePathname()

    const itsHome = useMemo(() => pathname === "/", [pathname])

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="lg">
            <NavbarContent className="pl-0">

                {

                    itsHome && (
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                    )
                }

                <NavbarBrand>
                    <AppLogo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                {children}
            </NavbarContent>

            {
                itsHome && (
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item.href}-${index}`}>
                                <Link
                                    color={
                                        index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    className="w-full"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                )
            }

        </Navbar>
    )
}

// export default CustomNavbar