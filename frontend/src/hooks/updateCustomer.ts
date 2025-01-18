import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetCustomers from "./useGetCustomers";

type TUpdateValues = {
    id?: string | number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    home_number?: string;
    office_number?: string;
    repairshopr_customer_id?: string | number;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    business_name?: string | null;
    address_2?: string | null;
};

const useUpdateCustomerLocally = () => {
    const [updateCustomerLocallyLoading, setLoading] = useState(false); // Loading state
    const { refetch } = useGetCustomers();
    const updateCustomerLocally = async (
        id: string | number | undefined,
        values: TUpdateValues
    ) => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/customers/` +
                    id,
                values,
                {
                    withCredentials: true,
                }
            );
            await refetch();
            return response.data;
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { updateCustomerLocally, updateCustomerLocallyLoading };
};

export default useUpdateCustomerLocally;
