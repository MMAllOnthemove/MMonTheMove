"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TData = {
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

const useUpdateRepairshoprCustomer = () => {
    const [updateCustomerRepairshoprLoading, setLoading] = useState(false);
    const updateCustomer = async (
        customerId: string | number | any,
        values: TData
    ) => {
        if (!customerId) return;
        setLoading(true);

        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_CUSTOMER}/${customerId}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
            if (data?.customer) {
                toast.success("Customer updated successfully!");
                return data?.customer;
            }
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return { updateCustomer, updateCustomerRepairshoprLoading };
};

export default useUpdateRepairshoprCustomer;
