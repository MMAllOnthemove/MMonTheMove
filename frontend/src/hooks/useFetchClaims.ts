import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TEngineers = {
    id: string;
    unique_id: string;
    engineer_firstname: string;
    engineer_lastname: string;
    department: string;
};

const useFetchClaims = () => {
    const [claimsList, setData] = useState<TEngineers[]>([]);
    const [claimsLoading, setLoading] = useState(true);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/claims`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response?.data);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { claimsList, claimsLoading, refetch };
};

export default useFetchClaims;
