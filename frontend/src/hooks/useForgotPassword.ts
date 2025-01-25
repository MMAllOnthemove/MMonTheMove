import { useState } from "react";
import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
import { ForgotPasswordValues } from "@/lib/types";
interface ErrorMessages {
    email?: string;
}

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    useState("");
    const router = useRouter();
    const forgotPassword = async (values: ForgotPasswordValues) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/forgot_password`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                router.push("/");
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
            // setError(error?.response?.data?.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { forgotPassword, loading, errors };
};

export default useForgotPassword;
