import socket from "@/socket";
import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    created_by?: string;
    otp_code?: string;
}
type TOtp = {
    id: string;
    unique_id: string;
    created_by: string | null;
    otp_code: string | null;
};

const useOtp = () => {
    const [otpAddLoading, setAddLoading] = useState(false); // Loading state
    const [otpGetLoading, setGetLoading] = useState(false); // Loading state
    const [otpAddErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const [otp, setData] = useState<TOtp | null | any>();
    const router = useRouter();
    const addOTP = async (values: any) => {
        setAddLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/otp`,
                values,
                {
                    withCredentials: true,
                }
            );
            setData(response?.data?.otp);
            // 🔴 Emit task creation event
            socket.emit("addOtp", response?.data);
            router?.back();
            return response;
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setAddLoading(false); // Stop loading
        }
    };

    const getOTP = async () => {
        try {
            setGetLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/otp`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response.data?.otp?.otp_code);
            } else {
                setData(null);
            }
        } catch (error: any) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error fetching daily otp:",
                    error?.response?.data?.error
                );
            }
        } finally {
            setGetLoading(false);
        }
    };

    // 🔄 Listen for real-time updates
    useEffect(() => {
        getOTP();
        socket.on("addOtp", (task) => {
            toast.success(`OTP: ${task?.otp} has been added`, {
                position: "bottom-center",
                duration: 8000,
            });
            setData(task?.otp); // Add assigned task
            getOTP(); // 🔄 Ensure fresh data is fetched from API
        });

        return () => {
            socket.off("addOtp");
        };
    }, []);

    return { addOTP, otpAddLoading, otpAddErrors, otpGetLoading, getOTP, otp };
};

export default useOtp;
