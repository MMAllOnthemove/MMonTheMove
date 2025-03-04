import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCreateAssetsBookFromSO = () => {
    const [createAssetsBookFromSOLoading, setCreateAssetsBookFromSOLoading] =
        useState(false);

    const createAssetsOnRepairshopr = async (values: any) => {
        setCreateAssetsBookFromSOLoading(true);

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
                return assetId;
            }
        } catch (error: any) {
            if (error?.response?.data) {
                const { success, message, params } = error.response.data;
                if (!success && message) {
                    if (Array.isArray(message)) {
                        const errorMessages = message.join("\n");
                        toast(errorMessages, { duration: 6000 });
                    } else {
                        toast(message, { duration: 6000 });
                    }
                }
            }
        } finally {
            setCreateAssetsBookFromSOLoading(false);
        }
    };
    return { createAssetsOnRepairshopr, createAssetsBookFromSOLoading };
};
