'use client'

import { SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet, SheetFooter } from "@/shared/components/ui/sheet"
import { Fragment } from "react"
import { useUIStore } from "../store/uiStore"
import { MythoForm } from "./MythoForm"
import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

export const CreateSheet = () => {
    const { open, setOpen } = useUIStore();
    
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Nuevo Mytho</SheetTitle>
                        <SheetDescription>
                            ¡Crea un nuevo Mytho! Toda la información será utilizada para mejorar los resultados de la IA.
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="my-4 h-[calc(100vh-196px)]">
                        <MythoForm />
                    </ScrollArea>
                <SheetFooter>
                    <Button type="submit" form="create-mytho">Crear</Button>
                </SheetFooter>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}
