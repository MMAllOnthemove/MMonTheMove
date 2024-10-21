import { pool } from "../../../../db.js";

// GET all table info from database

const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, service_order_no, DATE(date_booked)::TEXT AS date_booked, created_at, model, warranty, engineer, fault, imei, serial_number, repairshopr_status, gspn_status, ticket_number, department, job_added_by, assessment_date, DATE(parts_pending_date)::TEXT as parts_pending_date, DATE(parts_issued_date)::TEXT as parts_issued_date,parts_pending stores, DATE(parts_ordered_date)::TEXT as parts_ordered_date, qc_complete, DATE(qc_complete_date)::TEXT as qc_complete_date, repair_completed FROM hhp_jobs WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY updated_at DESC"
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
            "SELECT id, unique_id, service_order_no, DATE(date_booked)::TEXT AS date_booked, created_at, model, warranty, engineer, fault, imei, serial_number, repairshopr_status, gspn_status, ticket_number, department, job_added_by, assessment_date, DATE(parts_pending_date)::TEXT as parts_pending_date, DATE(parts_issued_date)::TEXT as parts_issued_date, parts_pending, stores, DATE(parts_ordered_date)::TEXT as parts_ordered_date, qc_complete, DATE(qc_complete_date)::TEXT as qc_complete_date, repair_completed FROM hhp_jobs WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND unique_id = $1 ORDER BY updated_at DESC",
            [id]
        );
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
};
export { GetAllTasks, GetTaskById };
