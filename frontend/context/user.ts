import { createContext } from "react";

export interface ICurrentUserContextType {
    email: string;
}

export const CurrentUserContext = createContext<ICurrentUserContextType | null>(null);