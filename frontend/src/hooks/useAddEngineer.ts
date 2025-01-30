import { EngineerAdd } from "@/lib/types";
import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    engineer_firstname?: string;
    engineer_lastname?: string;
    engineer_code?: string;
    department?: string;
}

const useAddEngineer = () => {
    const [addEngineerLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addEngineer = async (values: EngineerAdd) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/engineers`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                toast.success(`${data?.message}`);
            }
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(`${error?.response?.data?.message}`);
            } 
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addEngineer, addEngineerLoading, errors };
};

export default useAddEngineer;
