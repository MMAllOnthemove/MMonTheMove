"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type TStores = {
    id: string;
    unique_id: string;
    store_name: string | null;
};

const useGetStores = () => {
    const [storesList, setData] = useState<TStores | any>([]);
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
                    // console.log(response);
                    setData([...response.data]);
                }
            } catch (error) {
                console.log("Get storesList error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [storesList]);

    return { storesList, storesListLoading };
};

export default useGetStores;
