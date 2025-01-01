import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteHHPTask = () => {
    const [deleteHHPTaskLoading, setLoading] = useState(false); // Loading state

    const deleteTask = async (id: string) => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/${id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success(`${response?.data?.message}`);
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteTask, deleteHHPTaskLoading };
};

export default useDeleteHHPTask;
