import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

interface ErrorMessages {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    createdAt?: Date;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    // the alert for the success message is invoked on the main home screen
    // so, this state is for the auth error to show on login screen
    const [signupErrorFromBackend, setSignupErrorFromBackend] = useState("");

    const router = useRouter();
    const { toast } = useToast();
    const signup = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL_SIGNUP}`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log("signup response", response);
            if (response.status === 201) {
                toast({
                    title: `${response?.data?.message}`,
                    description: "You can now use the system",
                });
                router.push("/");
            }
        } catch (error: any) {
            console.log("signup error", error?.response);
            setSignupErrorFromBackend(`${error?.response?.data?.message}`);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { signup, loading, errors, signupErrorFromBackend };
};

export default useSignup;
