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

const useFetchHHPTaskById = (taskId: string | number) => {
    const [hhpTask, setHHPTask] = useState<IHHPTask | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                        taskId,
                    {
                        withCredentials: true,
                    }
                );
                if (data) {
                    // console.log(data);
                    setHHPTask(data);
                }
            } catch (error) {
                console.log("fetching single task error", error);
            }
        };
        fetchData();
    }, [hhpTask, taskId]);
    return { hhpTask };
};
export default useFetchHHPTaskById;