import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
interface ErrorMessages {
    warranty?: string;
    engineer?: string;
    status?: string;
    stores?: string;
    repeat_repair?: string;
}

const useAddHHPTask = () => {
    const [addHHPTaskLoading, setLoading] = useState(false); // Loading state
    const [addHHPTaskErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const router = useRouter();
    const addTask = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log("useAddRepairHHPTask response", response);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                router.push("/");
            }
        } catch (error: any) {
            // console.log("login error", error?.response.data?.message);

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

    return { addTask, addHHPTaskLoading, addHHPTaskErrors };
};

export default useAddHHPTask;
