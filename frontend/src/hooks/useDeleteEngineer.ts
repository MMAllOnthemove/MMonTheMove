import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteEngineer = () => {
    const [deleteEngineerLoading, setLoading] = useState(false); // Loading state

    const deleteEngineer = async (engineerId: string) => {
        setLoading(true);
        if (!engineerId) return;
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/engineers/${engineerId}`,
                {
                    withCredentials: true,
                }
            );
            if (response.data) {
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

    return { deleteEngineer, deleteEngineerLoading };
};

export default useDeleteEngineer;
