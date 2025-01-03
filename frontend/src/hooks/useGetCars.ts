"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TCars = {
    id: string;
    unique_id: string;
    plate_number?: string;
    car_model?: string;
    created_at?: string;
};

const useCars = () => {
    const [carsList, setData] = useState<TCars[]>([]);
    const [carsListLoading, setLoading] = useState(true);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/cars`,
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

    return { carsList, carsListLoading, refetch };
};

export default useCars;
