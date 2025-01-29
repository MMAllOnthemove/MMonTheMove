import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCreateAssets = () => {
    const [createAssetLoading, setCreateAssetLoading] = useState(false);
    const router = useRouter();

    const createAssetsOnRepairshopr = async (
        customerEmail: string | number | boolean,
        values: any
    ) => {
        setCreateAssetLoading(true);

        if (!customerEmail) return;
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
            if (data) {
                const assetId = data?.asset?.id;
                // storeCreatedAssetsToLocalStorage(assetId);
                toast.success(`Assets created, Continue`);
                router.push(
                    `/bookings/staff/create_ticket/rs/${encodeURIComponent(
                        customerEmail
                    )}`
                );
                return assetId;
            }
        } catch (error: any) {
            toast.error(`${error?.response.data.message[0]}`);
        } finally {
            setCreateAssetLoading(false);
        }
    };
    return { createAssetsOnRepairshopr, createAssetLoading };
};
