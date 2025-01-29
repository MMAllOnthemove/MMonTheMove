import { useState, useEffect } from "react";

const useSearchStorage = (key: string, initialValue: string = "") => {
    const [search, setSearch] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key) || initialValue;
        }
        return initialValue;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, search);
        }
    }, [search, key]);

    return [search, setSearch] as const;
};

export default useSearchStorage;
