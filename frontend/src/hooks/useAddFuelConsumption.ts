"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TFuelConsumption = {
    id: string;
    unique_id: string;
    car_name?: string;
    receipt_number?: string;
    odometer?: string;
    filled_volume_litres?: number;
    fuel_price_per_litre?: number;
    tank_filled?: string;
    km_travelled_from_last_refill?: number;
    litres_travelled_from_last_refill?: number;
    total_fill_cost?: number;
    km_consumption_per_litre?: number;
    litres_consumption_per_100km?: number;
    cost_of_the_km?: number;
    created_at?: string;
};
interface ErrorMessages {
    car_name?: string;
    receipt_number?: string;
}
const useAddFuelConsumption = () => {
    const [addConsumptionLoading, setLoading] = useState(false); // Loading state
    const [addConsumptionLoadingErrors, setErrors] = useState<ErrorMessages>(
        {}
    ); // Explicitly typed
    const addFuelConsumption = async (values: TFuelConsumption | any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/fuel`,
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

    return {
        addFuelConsumption,
        addConsumptionLoading,
        addConsumptionLoadingErrors,
    };
};

export default useAddFuelConsumption;
