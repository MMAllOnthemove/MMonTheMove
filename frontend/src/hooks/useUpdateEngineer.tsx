"use client";
import { TUpdateEngineer } from "@/lib/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateEngineer = () => {
    const [updateEngineerLoading, setLoading] = useState(false); // Loading state
    const updateEngineer = async (
        rowId: string | number | any,
        values: TUpdateEngineer
    ) => {

        if (!rowId) return;
        try {
            setLoading(true);
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/engineers/` +
                rowId,
                values,
                {
                    withCredentials: true,
                }
            );
            if (data) toast.success(`${data?.message}`)
        } catch (error: any) {
            console.error(error)
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return { updateEngineer, updateEngineerLoading };
};

export default useUpdateEngineer;
