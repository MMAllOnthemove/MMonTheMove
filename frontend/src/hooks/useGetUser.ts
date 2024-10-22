"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type TUser = {
    user_unique_id: string;
    email: string;
    user_name: string;
    full_name: string;
    user_role: string;
    department: string;
};

const useUserLoggedIn = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/user/me`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    // console.log(response.data?.user);
                    setUser(response.data?.user);
                    setIsLoggedIn(true); // User is logged in if data is returned
                } else {
                    setIsLoggedIn(false); // No user data means not logged in
                }
            } catch (error) {
                console.log("Get user info error", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, isLoggedIn, loading };
};

export default useUserLoggedIn;
