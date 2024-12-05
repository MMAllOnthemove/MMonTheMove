import { pool } from "../../../../db.js";

// GET all table info from database

const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT tt.id, tt.unique_id, tt.service_order_no, DATE(tt.date_booked)::text AS date_booked, COALESCE(DATE(tt.parts_requested_date)::text, '') AS parts_requested_date, tt.parts_requested, tt.date_booked AS date_booked_datetime, tt.units_assessed, DATE(tt.updated_at)::text AS updated_at, tt.stores, tt.model, tt.warranty, tt.engineer, tt.fault, tt.imei, tt.serial_number, tt.unit_status, tt.ticket_number, tt.department, tt.job_added_by, tt.updated_by, COALESCE(DATE(tt.assessment_date)::text, '') AS assessment_date, COALESCE(tt.assessment_date, '') AS assessment_datetime, COALESCE(DATE(tt.parts_pending_date)::text, '') AS parts_pending_date, COALESCE(DATE(tt.parts_issued_date)::text, '') AS parts_issued_date, tt.parts_pending, COALESCE(DATE(tt.parts_ordered_date)::text, '') AS parts_ordered_date, tt.repairshopr_job_id, tt.qc_complete, COALESCE(DATE(tt.qc_date)::text, '') AS qc_date, tt.parts_issued, tt.repeat_repair, completed_date, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id WHERE EXTRACT(YEAR FROM tt.created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) GROUP BY tt.id ORDER BY tt.date_booked DESC"
        );
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (err) {
        console.log(err);
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
            "SELECT tt.id, tt.unique_id, tt.service_order_no, DATE(tt.date_booked)::text AS date_booked, COALESCE(DATE(tt.parts_requested_date)::text, '') AS parts_requested_date, tt.parts_requested, tt.date_booked AS date_booked_datetime, tt.units_assessed, DATE(tt.updated_at)::text AS updated_at, tt.stores, tt.model, tt.warranty, tt.engineer, tt.fault, tt.imei, tt.serial_number, tt.unit_status, tt.ticket_number, tt.department, tt.job_added_by, tt.updated_by, COALESCE(DATE(tt.assessment_date)::text, '') AS assessment_date, COALESCE(tt.assessment_date, '') AS assessment_datetime, COALESCE(DATE(tt.parts_pending_date)::text, '') AS parts_pending_date, COALESCE(DATE(tt.parts_issued_date)::text, '') AS parts_issued_date, tt.parts_pending, COALESCE(DATE(tt.parts_ordered_date)::text, '') AS parts_ordered_date, tt.repairshopr_job_id, tt.qc_complete, COALESCE(DATE(tt.qc_date)::text, '') AS qc_date, tt.parts_issued, tt.repeat_repair, completed_date, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id WHERE EXTRACT(YEAR FROM tt.created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND tt.id = $1 GROUP BY tt.id ORDER BY updated_at DESC",
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
