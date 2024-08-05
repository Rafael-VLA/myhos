'use client'

import { CustomNavbar } from "@/shared/components/CustomNavbar"
import { Button } from "@/shared/components/ui/button"
import { NavbarItem } from "@nextui-org/navbar"
import { Fragment } from "react"
import { HiPlus } from "react-icons/hi2"
import { useUIStore } from "../store/uiStore"


export const CustomNavbarDashboard = () => {
    const { open, setOpen } = useUIStore()

    return (
        <CustomNavbar>
            <Fragment>
                <NavbarItem>
                    <Button
                        onClick={() => setOpen(!open)}
                        variant="default"
                        size="sm"
                    >
                        <HiPlus size={14} className="mr-1" /> Crear
                    </Button>
                </NavbarItem>
            </Fragment>
        </CustomNavbar>
    )
}
