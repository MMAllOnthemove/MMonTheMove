import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeletePart = () => {
    const [deletePartLoading, setLoading] = useState(false); // Loading state

    const deletePart = async (id: string | undefined) => {
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
                window.location.reload();
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.error}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deletePart, deletePartLoading };
};

export default useDeletePart;
