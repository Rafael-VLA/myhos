import { MouseEvent } from "react"
import { Button } from "@/shared/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { HiEllipsisHorizontal, HiTrash } from "react-icons/hi2"
import { useMythoStore } from "../store/mythoStore"
import { useAIStore } from "../store/aiStore"

interface Props {
    id: string
}

export const MythoCardMenu = ({ id }: Props) => {

    const stopPropagation = (e: MouseEvent) => e.stopPropagation();
    const removeMytho = useMythoStore(store => store.removeMytho)
    const cleanMessageHistory = useAIStore(store => store.cleanMessageHistory);

    const handleDelete = () => {
        removeMytho(id);
        cleanMessageHistory(id);
    }
        

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" onClick={stopPropagation}>
                    <HiEllipsisHorizontal size={14} />
                </Button>
            </PopoverTrigger>
            <PopoverContent onClick={stopPropagation} align="end" className="max-w-44 p-2 flex flex-col gap-2">
                <Button onClick={handleDelete} size="sm" variant="ghost" className="w-full justify-start">
                   <HiTrash size={14} className="mr-2" /> Eliminar
                </Button>
            </PopoverContent>
        </Popover>

    )
}
