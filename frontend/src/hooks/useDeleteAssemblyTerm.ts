import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteAssemblyTerm = () => {
    const [deleteEngineerLoading, setLoading] = useState(false); // Loading state

    const deleteAssemblyTerm = async (id: string | undefined) => {
        setLoading(true);
        if (!id) return;
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/terms/assembly/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteAssemblyTerm, deleteEngineerLoading };
};

export default useDeleteAssemblyTerm;
