import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    created_by?: string;
    otp_code?: string;
}

const useAddOtp = () => {
    const [otpAddLoading, setLoading] = useState(false); // Loading state
    const [otpAddErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const router = useRouter();
    const addOTP = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/otp`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                router.push("/");
            }
            return response;
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

    return { addOTP, otpAddLoading, otpAddErrors };
};

export default useAddOtp;
