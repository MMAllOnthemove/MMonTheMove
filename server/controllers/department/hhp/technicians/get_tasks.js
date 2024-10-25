import { pool } from "../../../../db.js";

// GET all table info from database

const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, service_order_no, date_booked, DATE(date_booked)::text as date_booked, DATE(updated_at)::text as updated_at, stores, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, updated_by, DATE(assessment_date)::text as assessment_date, DATE(parts_pending_date)::text as parts_pending_date, DATE(parts_issued_date)::text as parts_issued_date, parts_pending, DATE(parts_ordered_date)::text as parts_ordered_date, repairshopr_job_id, qc_complete, DATE(qc_date)::text as qc_date, parts_issued, repeat_repair, DATE(completed_date)::text as completed_date FROM hhp_jobs WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY updated_at DESC"
        );
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
};

// get job by id
const GetTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT id, unique_id, service_order_no, date_booked, DATE(date_booked)::text as date_booked, DATE(updated_at)::text as updated_at, stores, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, updated_by, DATE(assessment_date)::text as assessment_date, DATE(parts_pending_date)::text as parts_pending_date, DATE(parts_issued_date)::text as parts_issued_date, parts_pending, DATE(parts_ordered_date)::text as parts_ordered_date, repairshopr_job_id, qc_complete, DATE(qc_date)::text as qc_date, parts_issued, repeat_repair, DATE(completed_date)::text as completed_date FROM hhp_jobs WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND id = $1 ORDER BY updated_at DESC",
            [id]
        );
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
};
export { GetAllTasks, GetTaskById };
