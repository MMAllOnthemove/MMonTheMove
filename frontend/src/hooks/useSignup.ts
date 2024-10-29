import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
    const router = useRouter();

    const signup = async (values: unknown) => {
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
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                router.push("/");
            }
        } catch (error: unknown) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { signup, loading, errors };
};

export default useSignup;
