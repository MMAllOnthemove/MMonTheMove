import axios from "axios";
import moment from "moment";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetCustomerVisits from "./useGetCustomerVisits";
import { datetimestamp } from "@/lib/date_formats";

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

const useCreateCustomerLocally = () => {
    const [createCustomerLocallyLoading, setLoading] = useState(false); // Loading state
    const router = useRouter();
    const today = moment(datetimestamp).format("YYYY-MM-DD");
    const { refetch } = useGetCustomerVisits(today);
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
            if (data)
                toast.success(`${data?.message}`, {
                    duration: 8000,
                });
            refetch();
        } catch (error: any) {
            // console.error("add customer locally error", error);
            // toast.error(`${error?.response.data?.message}`);
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

    return { addCustomerLocally, createCustomerLocallyLoading };
};

export default useCreateCustomerLocally;
