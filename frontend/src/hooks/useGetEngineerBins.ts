"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TEngineerBins = {
    engineer: string | null;
    unit_status: string;
    units_count: string;
    ticket_numbers: [];
};

const useGetEngineerBins = () => {
    const [engineerBinList, setData] = useState<TEngineerBins[]>([]);
    const [engineerBinListLoading, setLoading] = useState(true);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/engineer/bin`,
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

    return { engineerBinList, engineerBinListLoading, refetch };
};

export default useGetEngineerBins;
