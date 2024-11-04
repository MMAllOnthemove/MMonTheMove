import { SignupValues } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    email?: string;
    password?: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const router = useRouter();
    const login = async (values: SignupValues) => {
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
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { login, loading, errors };
};

export default useLogin;
