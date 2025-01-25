"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TAssemblyTerms = {
    id: string;
    unique_id: string;
    term?: string;
    bold?: boolean | null;
    created_at?: string;
    checked?: boolean;
};

const useAssemblyTerms = () => {
    const [assemblyTermsList, setData] = useState<TAssemblyTerms[]>([]);
    const [assemblyTermsListLoading, setLoading] = useState(true);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/terms/assembly`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response.data);
            }
            return response?.data;
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

    return { assemblyTermsList, assemblyTermsListLoading, refetch };
};

export default useAssemblyTerms;
