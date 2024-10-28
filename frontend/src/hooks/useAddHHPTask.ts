import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
interface ErrorMessages {
    date_booked?: string;
    model?: string;
    warranty?: string;
    engineer?: string;
    fault?: string;
    imei?: string;
    serial_number?: string;
    status?: string;
    ticket_number?: string;
    department?: string;
    job_added_by?: string;
    stores?: string;
    repairshopr_job_id?: string;
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
                // router.push("/");
            }
        } catch (error: any) {
            console.log("useAddHHPTask error", error);

            if (error?.response?.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                toast.error("Fill in all fields");
                console.log(error.response);
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
