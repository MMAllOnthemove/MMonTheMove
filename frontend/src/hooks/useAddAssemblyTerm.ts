import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    term?: string;
}
type TAddAssemblyTerm = {
    term?: string;
    bold?: boolean | null;
    created_at?: string;
};
const useAddAssemblyTerm = () => {
    const [addAssemblyTermLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addAssemblyTerm = async (values: TAddAssemblyTerm) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/terms/assembly`,
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

    return { addAssemblyTerm, addAssemblyTermLoading, errors };
};

export default useAddAssemblyTerm;
