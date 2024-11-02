import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ErrorMessages {}

const useAddChecklist = () => {
    const [addChecklistLoading, setLoading] = useState(false); // Loading state
    const [addChecklistErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const addChecklist = async (values: unknown) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists`,
                values,
                {
                    withCredentials: true,
                }
            );

            return response;
        } catch (error: unknown) {
            console.log(error);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addChecklist, addChecklistLoading };
};

export default useAddChecklist;
