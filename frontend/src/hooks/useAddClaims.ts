import axios, { AxiosError } from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    service_order_no?: string;
    ticket_number?: string;
    claim_status?: string;
    department?: string;
    created_by?: string;
}


const useAddClaims = () => {
    const [addClaimLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addAddClaim = async (values: unknown) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/claims`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: unknown | AxiosError) {

            if (error?.response?.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
            // setError(error?.response?.data?.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addAddClaim, addClaimLoading, errors };
};

export default useAddClaims;
