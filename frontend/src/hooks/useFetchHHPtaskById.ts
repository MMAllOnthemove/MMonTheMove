import axios from "axios";
import { useEffect, useState } from "react";

type IHHPTask = {
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
    job_repair_no: string;
    serial_number: string;
    repairshopr_status: string;
    repairshopr_customer_id: number | null | undefined;
    gspn_status: string;
    device_location: string | null;
    requires_backup: string | null;
    ticket_number: string;
    department: string;
    job_added_by: string;
    assessment_date: string;
    parts_pending_date: string;
    parts_issued_date: string;
    stores: boolean | null;
    parts_ordered_date: string | null;
    completed_date: string | null;
    additional_info: string | null;
    collected_date: string | null;
    qc_complete: string | null;
    qc_date: string | null;
    repair_completed: string | null;
    rs_warranty: string | null;
    accessories_and_condition: string | null;
    unit_status: string;
    unit_complete: boolean;
    collected: string | boolean;
    parts_pending: string | boolean;
    parts_issued: string | boolean;
    compensation: string | boolean;
    comments: {
        comment_id: number;
        comment_text: string;
        comment_created_at: string;
        created_by: string;
    };
    parts: {
        part_id: number;
        unique_id: string;
        ticket_number: string;
        part_name: string;
        part_desc: string;
        seal_number: null | string;
        part_quantity: number;
        parts_status: null | string;
        created_at: string;
        created_by: string;
        updated_at: null | string;
        compensation: boolean;
    };
    repairshopr_job_id: string;
};

const useFetchHHPTaskById = (taskId: string | string[] | any) => {
    const [hhpTask, setHHPTask] = useState<IHHPTask | null>(null);

    const refetch = async () => {
        if (!taskId) return;
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                    taskId,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setHHPTask(data[0]);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching HHP task by id:", error);
            }
        }
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);
    return { hhpTask, refetch };
};
export default useFetchHHPTaskById;
