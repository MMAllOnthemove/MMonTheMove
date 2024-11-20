import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteTaskPart = () => {
    const [deletePartLoading, setLoading] = useState(false); // Loading state

    const deleteTaskPart = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
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

    return { deleteTaskPart, deletePartLoading };
};

export default useDeleteTaskPart;
