import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";

const useDeleteStore = () => {
    const [deleteStoreLoading, setLoading] = useState(false); // Loading state

    const deleteStore = async (engineerId: string) => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/stores/${engineerId}`,
                {
                    withCredentials: true,
                }
            );
            console.log("deleteStore response", response);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                // window.location.reload();
                // setLoading(true);
            }
        } catch (error: any) {
            console.log("deleteStore error", error);
            // console.log("login error", error?.response.data?.message);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteStore, deleteStoreLoading };
};

export default useDeleteStore;