import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRepairshoprFetchAsset = (assetId: string | number) => {
    const [fetchRSByAssetData, setData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!assetId) return;
                const { data } = await axios.get(
                    `https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );

                if (data?.ticket?.id == assetId) setData(data);
            } catch (error: any) {
                if (error?.response?.data?.message.length > 0) {
                    const errors = error?.response?.data?.message;
                    toast.error(errors);
                }
            }
        };
        fetchData();
    }, [assetId]);
    return { fetchRSByAssetData };
};

export default useRepairshoprFetchAsset;
