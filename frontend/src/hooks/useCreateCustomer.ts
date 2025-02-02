import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

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
    zip?: string | number;
};
// useCreateCustomer

const useCreateCustomerOnRepairshopr = () => {
    const [createCustomerLoading, setLoading] = useState(false); // Loading state
    const addCustomer = async (values: TPayload) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_CUSTOMER}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
            const customerId = data?.customer?.id;
            return customerId;
        } catch (error: any) {
            if (error?.response?.data) {
                const { success, message, params } = error.response.data;
                if (!success && message) {
                    if (Array.isArray(message)) {
                        const errorMessages = message.join("\n");
                        toast(errorMessages, { duration: 6000 });
                    } else {
                        toast(message, { duration: 6000 });
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return { addCustomer, createCustomerLoading };
};

export default useCreateCustomerOnRepairshopr;
