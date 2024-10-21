import axios from "axios";

const useRepairshoprFetchAsset = () => {
    const fetchRSByAssetData = async (assetId: string | number) => {
        try {
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            if (data?.ticket?.id == assetId) return data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchRSByAssetData };
};

export default useRepairshoprFetchAsset;
