import { useState } from "react";
import axios from "axios";

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

            if (res.status === 204) {
                window.location.reload();
                console.log("logged out");
            }
        } catch (err) {
            console.log("could not logout", JSON.stringify(err));
        } finally {
            setLogoutLoading(false);
        }
    };

    return { logoutUser, logoutLoading, error };
};

export default useLogoutUser;
