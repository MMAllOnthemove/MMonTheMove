import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const router = useRouter();
    const { toast } = useToast();
    const signup = async (values: any) => {
        setLoading(true);
        setError(null); // Reset error before new attempt

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL_SIGNUP}`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log("signup response", response);
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
                error?.response?.data.errors ||
                    "An error occurred during signup"
            );
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { signup, loading, error };
};

export default useSignup;
