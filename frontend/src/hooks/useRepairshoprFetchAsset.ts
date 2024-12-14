import axios from "axios";
import { useEffect, useState } from "react";

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
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error(
                        "Error fetching adding HHP task by GSPNError fetching adding HHP task by GSPN:",
                        error
                    );
                }
            }
        };
        fetchData();
    }, [assetId]);
    return { fetchRSByAssetData };
};

export default useRepairshoprFetchAsset;
