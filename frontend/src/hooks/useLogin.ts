import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const router = useRouter();
    const { toast } = useToast();
    const login = async (values: any) => {
        setLoading(true);
        setError(null); // Reset error before new attempt

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL_LOGIN}`,
                values,
                {
                    withCredentials: true,
                }
            );

            if (response.data) {
                toast({
                    title: `${response?.data?.message}`,
                    description: "You can now use the system",
                });
                router.push("/");
            }
        } catch (error: any) {
            console.log("login error", error);
            setError(
                error?.response?.data.errors || "An error occurred during login"
            );
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { login, loading, error };
};

export default useLogin;
