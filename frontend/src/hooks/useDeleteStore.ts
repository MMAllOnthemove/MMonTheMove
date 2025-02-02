import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteStore = () => {
    const [deleteStoreLoading, setLoading] = useState(false); // Loading state

    const deleteStore = async (engineerId: string | undefined) => {
        if (engineerId) return;
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/stores/${engineerId}`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            if (error?.response.data?.error) {
                toast.error(`${error?.response.data?.error}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteStore, deleteStoreLoading };
};

export default useDeleteStore;
