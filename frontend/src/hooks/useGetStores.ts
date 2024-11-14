"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TStores = {
    id: string;
    unique_id: string;
    store_name: string;
};

type TError = {
    error: {
        response: {
            data: {
                error: any;
            };
        };
    };
};

const useGetStores = () => {
    const [storesList, setData] = useState<TStores[]>([]);
    const [storesListLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/stores`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setData(response.data);
                }
            } catch (error: any) {
                if (error) toast.error(error?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [storesList]);

    return { storesList, storesListLoading };
};

export default useGetStores;
