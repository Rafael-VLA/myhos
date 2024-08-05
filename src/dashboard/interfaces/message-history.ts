export type TypeUser = "user" | "ia";

export interface MessageHistory {
    id: string;
    idMytho: string;
    content: string;
    itsHTML: boolean;
    user: TypeUser;
}