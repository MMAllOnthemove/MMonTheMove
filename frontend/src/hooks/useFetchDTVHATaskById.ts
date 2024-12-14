import axios from "axios";
import { useEffect, useState } from "react";

interface IHHPTask {
    id: string;
    unique_id: string;
    service_order_no: string;
    date_booked: string;
    created_at: string;
    model: string;
    warranty: string;
    engineer: string;
    fault: string;
    imei: string;
    serial_number: string;
    repairshopr_status: string;
    gspn_status: string;
    ticket_number: string;
    department: string;
    job_added_by: string;
    assessment_date: string;
    parts_pending_date: string;
    parts_issued_date: string;
    stores: boolean | null;
    parts_ordered_date: string | null;
    qc_complete: string | null;
    qc_complete_date: string | null;
    repair_completed: string | null;
    repairshopr_job_id: string;
}

const useFetchDTVHATaskById = (taskId: string | number) => {
    const [dtvhaTask, setDTVHATask] = useState<IHHPTask | null>(null);

    const refetch = async () => {
        if (!taskId) return;
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/jobs/` +
                    taskId,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setDTVHATask(data);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching DTV/HA task by id:", error);
            }
        }
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);
    return { dtvhaTask };
};
export default useFetchDTVHATaskById;
