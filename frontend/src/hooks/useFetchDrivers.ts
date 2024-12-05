import axios from "axios";
import { useEffect, useState } from "react";

type Tdrivers = {
    id: string;
    unique_id: string;
    driver_firstname: string;
    driver_lastname: string;
};

const useFetchDrivers = () => {
    const [driversList, setdrivers] = useState<Tdrivers[]>([]);
    const [driversListLoading, setdriversLoading] = useState(true);

    const refetch = async () => {
        try {
            setdriversLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/drivers`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setdrivers(response?.data);
            }
        } catch (error: any) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error fetching drivers:",
                    error?.response?.data?.error
                );
            }
        } finally {
            setdriversLoading(false);
        }
    };

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { driversList, driversListLoading, refetch };
};

export default useFetchDrivers;
