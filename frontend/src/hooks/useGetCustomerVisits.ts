"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TCustomerVisits = {
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
    repairshopr_customer_id?: string | number;
    updated_at?: string;
};

const useGetCustomerVisits = (date: string) => {
    const [customerVisitList, setData] = useState<TCustomerVisits[]>([]);
    const [customerVisitListLoading, setLoading] = useState(true);

    const refetch = async () => {
        if (!date) return;
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/customer_visits/${date}`,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                const showRecentTicket = data.map((entry: any) => ({
                    ...entry,
                    recent_ticket: entry.ticket_numbers[0] || null,
                }));
                setData(showRecentTicket);
            }
            return data;
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

    return { customerVisitList, customerVisitListLoading, refetch };
};

export default useGetCustomerVisits;
