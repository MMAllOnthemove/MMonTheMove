import axios from "axios";
import moment from "moment";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetCustomerVisits from "./useGetCustomerVisits";
import { datetimestamp } from "@/lib/date_formats";
import socket from "@/socket";

type TPayload = {
    firstname: string;
    lastname: string;
    businessname?: string;
    email: string;
    phone: string | number;
    mobile: string | number;
    address?: string;
    address_2?: string;
    city?: string;
    state?: string;
    repairshopr_customer_id?: string | number;
    visit_date: string;
    zip?: string | number;
};
// useCreateCustomer
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

const useCustomerLocally = (date?: string) => {
    const [createCustomerLocallyLoading, setLoading] = useState(false); // Loading state
    const router = useRouter();
    const today = moment(datetimestamp).format("YYYY-MM-DD");
    const [customerVisitList, setData] = useState<TCustomerVisits[]>([]);
    const [customerVisitListLoading, setCustomerVisitListLoading] =
        useState(true);

    const addCustomerLocally = async (values: TPayload) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/customer_visits`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                    // withCredentials: true, // no need as we do not require the token, we have a rate limit
                    // customer will handle this section
                }
            );
            setData((prev: any) => [...prev, data?.visit]); // Append new task
            // 🔴 Emit customer visit creation event
            // socket.emit("addCustomerVisit", data?.visit);
            if (data) toast.success(`${data?.message}`);
            // refetch();
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                const result = Object.entries(error.response.data.errors)?.map(
                    ([key, value]) => {
                        return `${value}`;
                    }
                );
                toast(`${result}`);
            }
        } finally {
            setLoading(false);
        }
    };
    const refetchCustomerWithVisit = async () => {
        if (!date) return;
        try {
            setCustomerVisitListLoading(true);
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
            setCustomerVisitListLoading(false);
        }
    };
    // 🔄 Listen for real-time updates
    useEffect(() => {
        refetchCustomerWithVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        addCustomerLocally,
        createCustomerLocallyLoading,
        customerVisitList,
        customerVisitListLoading,
    };
};

export default useCustomerLocally;
