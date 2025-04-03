import { CarAdd } from "@/lib/types";
import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    plate_number?: string;
    car_model?: string;
    created_at?: string;
    created_by?: string | undefined;
}

const useAddCar = () => {
    const [addCarLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addCar = async (values: CarAdd) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/cars`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
            return response?.data;
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

    return { addCar, addCarLoading, errors };
};

export default useAddCar;
