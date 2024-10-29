import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    engineer_firstname?: string;
    engineer_lastname?: string;
    department?: string;
}

const useAddEngineer = () => {
    const [addEngineerLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addEngineer = async (values: unknown) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/engineers`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: unknown) {

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

    return { addEngineer, addEngineerLoading, errors };
};

export default useAddEngineer;
