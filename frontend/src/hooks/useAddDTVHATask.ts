import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    date_booked?: string;
    model?: string;
    warranty?: string;
    engineer?: string;
    fault?: string;
    serial_number?: string;
    status?: string;
    ticket_number?: string;
    department?: string;
    job_added_by?: string;
    stores?: string;
    repairshopr_job_id?: string;
    repeat_repair?: string;
}

const useAddDTVHATask = () => {
    const [addDTVHATaskLoading, setLoading] = useState(false); // Loading state
    const [addDTVHATaskErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const addTask = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/jobs`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                toast.error("Fill in all fields");
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addTask, addDTVHATaskLoading, addDTVHATaskErrors };
};

export default useAddDTVHATask;
