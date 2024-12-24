import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TUpdateValues = {
    id?: string | number;
    device_name?: string;
    service_order_no?: string;
    unit_status?: string;
    assessment_date?: string;
    parts_pending_date?: string;
    parts_issued_date?: string;
    parts_issued?: boolean;
    parts_pending?: boolean;
    qc_date?: string;
    qc_complete?: boolean;
};

const useUpdateHHPTask = () => {
    const [updateHHPTaskLoading, setLoading] = useState(false); // Loading state
    const updateHHPTask = async (
        taskId: string | number | undefined,
        values: TUpdateValues
    ) => {
        setLoading(true);
        try {
            if (!taskId) return;

            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                    taskId,
                values,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { updateHHPTask, updateHHPTaskLoading };
};

export default useUpdateHHPTask;
