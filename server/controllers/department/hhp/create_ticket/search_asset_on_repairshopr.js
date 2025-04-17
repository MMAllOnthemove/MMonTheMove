import axios from "axios";
import "dotenv/config";

export const searchAssetOnRepairshopr = async (serialNumber, customer_id) => {
    const res = await axios.get(
        `https://allelectronics.repairshopr.com/api/v1/customer_assets?query=${serialNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
            },
        }
    );
    if (res?.status === 200) {
        return (
            res.data?.assets?.filter(
                (asset) => asset.customer_id == customer_id
            ) || []
        );
    }
};
