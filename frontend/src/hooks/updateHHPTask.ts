import axios from "axios";
import toast from "react-hot-toast";

type TUpdateValues = {
    id?: string | number;
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
    const updateHHPTask = async (
        taskId: string | number | undefined,
        values: TUpdateValues
    ) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                    taskId,
                values,
                {
                    withCredentials: true,
                }
            );
            // todo: uncomment if test fails
            // window.location.reload();
            return response.data;
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        }
    };

    return { updateHHPTask };
};

export default useUpdateHHPTask;
