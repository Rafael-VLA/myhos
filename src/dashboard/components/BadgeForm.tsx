import { Badge } from "@/shared/components/ui/badge";
import { FC } from "react";
import { HiXMark } from 'react-icons/hi2'

interface Props {
    gender: string;
    removeGender: () => void;
    className?: string;
}

export const BadgeForm:FC<Props> = ({ gender, className, removeGender }) => {
  return (
    <Badge className={ className }>
        <button type="button" onClick={removeGender} className="mr-1">
            <HiXMark size={14} />
        </button>
        { gender }
    </Badge>
  )
}
