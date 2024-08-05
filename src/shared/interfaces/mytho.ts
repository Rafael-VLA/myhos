import { Descendant } from "slate";

export interface Mytho {
    id: string;
    title: string;
    description: string;
    type: string;
    genders: string[];
    content: Descendant[]
    createdAt: number; // its a date type time
}