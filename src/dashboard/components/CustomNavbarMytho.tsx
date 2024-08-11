'use client'

import { Button } from "@/shared/components/ui/button"
import { Navbar, NavbarContent } from "@nextui-org/navbar"
import { useRouter } from "next/navigation"
import { HiChevronLeft, HiOutlineDocumentArrowDown } from "react-icons/hi2"
import { useAIStore } from "../store/aiStore"
import { useMythoStore } from "../store/mythoStore"
import { serializeToHTML } from "../utils/slate"
import { exportHTMLToPDF } from "../utils/export-pdf"

export const CustomNavbarMytho = () => {
    const router = useRouter()
    const cleanMessageHistory = useAIStore(store => store.cleanMessageHistory);
    const currentMytho = useMythoStore(store => store.currentMytho)

    const handleExport = () => {
        if(!currentMytho) return;
        const html = currentMytho.content.map(serializeToHTML).join("<br />")
        exportHTMLToPDF(html, currentMytho.title)
    }

    return (
        <Navbar maxWidth="lg">
            <NavbarContent className="pl-0">
                <Button size="sm" variant="outline" onClick={() => router.back()}>
                    <HiChevronLeft size={14} />
                </Button>
            </NavbarContent>
            <NavbarContent justify="end">
                <Button onClick={handleExport} variant="default" size="sm">
                    <HiOutlineDocumentArrowDown size={14} className="mr-1 text-[#ff5f6d]" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => cleanMessageHistory(currentMytho ? currentMytho.id : "")}>
                    Limpiar historial
                </Button>
            </NavbarContent>
        </Navbar>
    )
}