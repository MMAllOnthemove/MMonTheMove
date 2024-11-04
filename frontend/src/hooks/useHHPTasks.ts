"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type THHPTasks = {
    id: string;
    unique_id: string;
    service_order_no: string | null;
    date_booked: string;
    created_at: string | null;
    model: string | null;
    warranty: string | null;
    engineer: string | null;
    fault: string | null;
    imei: string | null;
    serial_number: string | null;
    repairshopr_status: string | null;
    gspn_status: string | null;
    ticket_number: string | null;
    department: string | null;
    job_added_by: string | null;
    assessment_date: string | null;
    parts_pending_date: string | null;
    parts_issued_date: string | null;
    parts_pending: string | null;
    stores: string | null;
    parts_ordered_date: string | null;
    qc_complete: string | boolean | null;
    qc_complete_date: string | null;
    repair_completed: string | null;
};

const useHHPTasks = () => {
    const [hhpTasks, setHHPTasks] = useState<THHPTasks[]>([]);
    const [hhpTasksLoading, setHHPTasksLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHHPTasksLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setHHPTasks([...response.data]);
                }
            } catch (error) {
                throw error;
            } finally {
                setHHPTasksLoading(false);
            }
        };

        fetchData();
    }, [hhpTasks]);

    return { hhpTasks, hhpTasksLoading };
};

export default useHHPTasks;
