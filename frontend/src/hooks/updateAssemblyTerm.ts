import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TUpdateValues = {
    term?: string;
};

const useUpdateAssemblyTerm = () => {
    const [updateAssemblyTermLoading, setLoading] = useState(false); // Loading state
    const updateAssemblyTerm = async (
        id: string | number | undefined,
        values: TUpdateValues
    ) => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/terms/assembly/` +
                    id,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { updateAssemblyTerm, updateAssemblyTermLoading };
};

export default useUpdateAssemblyTerm;
