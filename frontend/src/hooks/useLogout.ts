import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const useLogoutUser = () => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logoutUser = async () => {
        setLogoutLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/logout`,
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                toast.success(res.data?.message);
                window.location.reload();
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error logging out:", error);
            }
        } finally {
            setLogoutLoading(false);
        }
    };

    return { logoutUser, logoutLoading, error };
};

export default useLogoutUser;
