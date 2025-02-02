import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TUpdateValues = {
    id: string;
    unique_id?: string;
    ticket_number?: string;
    part_name?: string;
    compensation?: boolean | null | undefined | any;
    part_desc?: string;
    seal_number?: string | null;
    credit_req_number?: string | null;
    parts_status: string | null;
    created_at?: string;
    created_by: string;
    updated_at: string | null;
    stock_availability?: string;
    sales_status?: string;
};

const useUpdateParts = () => {
    const [updatePartLoading, setLoading] = useState(false); // Loading state

    const updatePart = async (
        partId: string | number | undefined,
        values: TUpdateValues
    ) => {
        if (!partId) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/` +
                    partId,
                values,
                {
                    withCredentials: true,
                }
            );
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            console.error(error);
            // if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { updatePart, updatePartLoading };
};

export default useUpdateParts;
