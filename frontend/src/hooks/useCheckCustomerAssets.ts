import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useSearchAssets = (customerId: string | number | undefined) => {
    const [searchAssets, setSearchAssets] = useState("");
    const [result, setResult] = useState<any[]>([]);
    const [loadingAssets, setLoading] = useState(false);

    useEffect(() => {
        const fetchAssets = async () => {
            if (!searchAssets || !customerId) return;

            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}?query=${searchAssets}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );
          
                setResult(
                    data?.assets.filter(
                        (asset: any) => asset.customer_id == customerId
                    ) || []
                );
            } catch (error: any) {
                toast.error(error?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchAssets, 300);
        return () => clearTimeout(debounce);
    }, [searchAssets, customerId]);

    return { searchAssets, setSearchAssets, result, loadingAssets };
};
