import axios from "axios";
import { useEffect, useState } from "react";

type TEngineers = {
    id: string;
    unique_id: string;
    engineer_firstname: string;
    engineer_lastname: string;
    department: string;
};

const useFetchClaims = () => {
    const [claimsList, setData] = useState<TEngineers[] | unknown>([]);
    const [claimsLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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
            } catch (error) {
                // 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [claimsList]);

    return { claimsList, claimsLoading };
};

export default useFetchClaims;
