"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TOtp = {
    id: string;
    unique_id: string;
    created_by: string | null;
    otp_code: string | null;
};

type tOtpError = {
    response: {
        data: {
            error: string;
        };
    };
};
const useGetOtp = () => {
    const [otp, setData] = useState<TOtp | null | any>();
    const [otpLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/otp`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setData(response.data?.otp);
                } else {
                    setData(null);
                }
            } catch (error: tOtpError | any) {
                if (process.env.NODE_ENV !== "production") {
                    console.error(
                        "Error fetching daily otp:",
                        error?.response?.data?.error
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [otp]);

    return { otp, otpLoading };
};

export default useGetOtp;
