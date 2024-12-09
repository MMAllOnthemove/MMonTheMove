"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TFuelConsumption = {
    id: string;
    unique_id: string;
    car_name?: string;
    receipt_number?: string;
    odometer?: number;
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

const useGetSingleFuelConsumption = (plate_number: string | undefined) => {
    const [fuelConsumptionCarData, setData] = useState<TFuelConsumption[]>([]);
    const [fuelConLoading, setLoading] = useState(true);

    const refetch = async () => {
        if (!plate_number) return; // Exit if plate_number is undefined
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/fuel/${plate_number}`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response.data);
            }
            return response?.data;
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { fuelConsumptionCarData, fuelConLoading, refetch };
};

export default useGetSingleFuelConsumption;
