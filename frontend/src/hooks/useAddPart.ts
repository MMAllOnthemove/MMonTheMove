import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    part_name?: string;
    part_desc?: string;
    part_quantity?: string;
}

type TAddPart = {
    task_row_id: string;
    ticket_number: string;
    part_name: string;
    part_desc: string;
    part_quantity: number | undefined;
    created_at: string;
    created_by: string;
};

const useAddPart = () => {
    const [addPartLoading, setLoading] = useState(false); // Loading state
    const [addPartErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addThisPart = async (values: TAddPart | any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
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

    return { addThisPart, addPartLoading, addPartErrors };
};

export default useAddPart;
