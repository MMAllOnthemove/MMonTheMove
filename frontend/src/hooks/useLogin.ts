import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

interface ErrorMessages {
    email?: string;
    password?: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    // the alert for the success message is invoked on the main home screen
    // so, this state is for the auth error to show on login screen
    const [loginErrorFromBackend, setLoginErrorFromBackend] = useState("");
    const router = useRouter();
    const { toast } = useToast();
    const login = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL_LOGIN}`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log("login response", response);
            if (response.status === 201) {
                toast({
                    title: `${response?.data?.message}`,
                    description: "You can now use the system",
                });
                router.push("/");
            }
        } catch (error: any) {
            console.log("login error", error?.response);
            setLoginErrorFromBackend(`${error?.data?.message}`);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
            // setError(error?.response?.data?.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { login, loading, errors, loginErrorFromBackend };
};

export default useLogin;
