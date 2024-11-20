import { TTaskParts } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchPartsForTask = (id: string) => {
    const [taskPartsList, setData] = useState<TTaskParts[]>([]);
    const [taskPartsListLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // Exit if id is undefined
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setData([...response?.data]);
                }
            } catch (error: any) {
                if (error?.response?.data?.error) {
                    // toast.error(`${error?.response?.data?.error}`);
                    // console.error(`${error?.response?.data?.error}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { taskPartsList, taskPartsListLoading };
};

export default useFetchPartsForTask;
