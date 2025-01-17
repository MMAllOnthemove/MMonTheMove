"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TCustomerByRSId = {
    id: string | number;
    unique_id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    home_number?: string;
    office_number?: string;
    address?: string;
    address_2?: string;
    created_at?: string;
    repairshopr_customer_id?: number | null | undefined;
    city?: string;
    state?: string;
    zip?: string;
    updated_at?: string;
};

const useGetCustomerLocallyByRSId = (rsId: number | null | undefined) => {
    const [singleCustomerByRsId, setData] = useState<TCustomerByRSId[]>([]);
    const [singleCustomerByRsIdLoading, setLoading] = useState(true);

    const refetch = async () => {
        if (!rsId) return;
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/customers/rs/${rsId}`,
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
    }, [rsId]);

    return { singleCustomerByRsId, singleCustomerByRsIdLoading, refetch };
};

export default useGetCustomerLocallyByRSId;
