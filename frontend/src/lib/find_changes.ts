// Find changes between original and updated data

type ChangeBetweenThisData = {
    id: string;
    unique_id: string;
    service_order_no: string;
    date_booked: string;
    updated_at: string;
    stores: string;
    model: string;
    warranty: string;
    engineer: string;
    fault: string;
    imei: string;
    serial_number: string;
    unit_status: string;
    ticket_number: string;
    department: string;
    job_added_by: string;
    updated_by: null | string;
    assessment_date: string;
    parts_pending_date: string;
    parts_issued_date: string;
    parts_pending: boolean;
    parts_ordered_date: string;
    repairshopr_job_id: string;
    qc_complete: null | boolean;
    qc_date: string;
    parts_issued: null | boolean;
    repeat_repair: string;
    completed_date: string;
};

const findChanges = (original: any, updated: any) => {
    const changes: any = {};
    for (const key in updated) {
        if (original[key] !== updated[key]) {
            changes[key] = updated[key];
        }
    }
    return changes;
};
export default findChanges;
