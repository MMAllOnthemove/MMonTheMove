import axios from "axios";
import "dotenv/config";

export const createAssetOnRepairshopr = async (payload) => {
    try {
        const response = await axios.post(
            `https://allelectronics.repairshopr.com/api/v1//customer_assets`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );
        if (response?.status === 200) {
            const assetId = response?.data?.asset?.id;
            return assetId;
        }
    } catch (error) {
        console.log("create asset on rs error", error);
    }
};
