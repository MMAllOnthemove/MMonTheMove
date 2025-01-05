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
    zip?: string | number;
};
// useCreateCustomer

const useCreateCustomerOnRepairshopr = () => {
    const [createCustomerLoading, setLoading] = useState(false); // Loading state
    const router = useRouter();
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
            // Convert the custInfo object to a JSON string
            // values['customer_id'] = `${customerId}`
            // const spreadCustomer = {
            //     ...values,
            //     customerId: `${customerId}`,
            // };
            // const custInfoString = JSON.stringify(spreadCustomer);
            // if (typeof window !== "undefined" && window.localStorage) {
            //     window.localStorage.setItem("custInfo", custInfoString);
            //     router.push("/repairshopr_asset");
            // }
        } catch (error: any) {
            toast.error(`${error?.response?.data?.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addCustomer, createCustomerLoading };
};

export default useCreateCustomerOnRepairshopr;
