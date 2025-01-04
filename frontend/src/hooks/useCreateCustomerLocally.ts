import { DriverAdd } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type TPayload = {
    firstname: string;
    lastname: string;
    businessname?: string;
    email: string;
    phone: string | number;
    mobile: string | number;
    address: string;
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
        } catch (error: any) {
            toast.error(`${error?.response.data?.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addCustomerLocally, createCustomerLocallyLoading };
};

export default useCreateCustomerLocally;
