import { pool } from "../../../../db.js";

// GET all table info from database

const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, service_order_no, DATE(date_booked)::text as date_booked, COALESCE(DATE(parts_requested_date)::text, '') as parts_requested_date, parts_requested, date_booked as date_booked_datetime, units_assessed, DATE(updated_at)::text as updated_at, stores, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, updated_by, COALESCE(DATE(assessment_date)::text, '') as assessment_date, COALESCE(assessment_date, '') as assessment_datetime, COALESCE(DATE(parts_pending_date)::text, '') as parts_pending_date, COALESCE(DATE(parts_issued_date)::text, '') as parts_issued_date, parts_pending, COALESCE(DATE(parts_ordered_date)::text, '') as parts_ordered_date, repairshopr_job_id, qc_complete, COALESCE(DATE(qc_date)::text, '') as qc_date, parts_issued, repeat_repair, COALESCE(DATE(completed_date)::text, '') as completed_date FROM technician_tasks WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY date_booked DESC"
        );
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message, // Hide detailed error message in production
        });
    }
};

// get job by id
const GetTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT id, unique_id, service_order_no, date_booked, DATE(date_booked)::text as date_booked, COALESCE(DATE(parts_requested_date)::text, '') as parts_requested_date, parts_requested, units_assessed, DATE(updated_at)::text as updated_at, stores, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, updated_by, DATE(assessment_date)::text as assessment_date, DATE(parts_pending_date)::text as parts_pending_date, DATE(parts_issued_date)::text as parts_issued_date, parts_pending, DATE(parts_ordered_date)::text as parts_ordered_date, repairshopr_job_id, qc_complete, DATE(qc_date)::text as qc_date, parts_issued, repeat_repair, DATE(completed_date)::text as completed_date FROM technician_tasks WHERE EXTRACT(YEAR FROM created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND id = $1 ORDER BY updated_at DESC",
            [id]
        );
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message, // Hide detailed error message in production
        });
    }
};
export { GetAllTasks, GetTaskById };
