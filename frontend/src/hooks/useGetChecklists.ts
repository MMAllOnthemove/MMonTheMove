import { VehicleInspection } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ErrorMessages {}

const useFetchChecklists = () => {
    const [checklistList, setchecklist] = useState<VehicleInspection[]>([]);
    const [checklistListLoading, setchecklistLoading] = useState(true);
    const [getChecklistErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    useEffect(() => {
        const fetchData = async () => {
            try {
                setchecklistLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setchecklist(response?.data);
                }
            } catch (error) {
                if (error?.response.data?.message) {
                    toast.error(`${error?.response.data?.message}`);
                } else if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors); // Set validation errors to state
                }
            } finally {
                setchecklistLoading(false);
            }
        };

        fetchData();
    }, [checklistList]);

    return { checklistList, checklistListLoading };
};

export default useFetchChecklists;
