import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TUpdateValues = {
    rowId: string | number | undefined | any;
    mileage_after: string;
    next_service_date: string;
};

const useUpdateChecklist = () => {
    const [loadUpdateChecklist, setLoading] = useState(false);
    const updateChecklist = async (
        rowId: string | number | undefined | any,
        values: TUpdateValues
    ) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists/` + rowId,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) toast.success(response?.data?.message);
            window.location.reload();
        } catch (error: any) {
            console.log("update checklist error", error);
            if (error) toast.error(error?.response?.data?.error);
        }
    };

    return { updateChecklist, loadUpdateChecklist };
};

export default useUpdateChecklist;
