import { pool } from "../../../../db.js";

// GET all table info from database

const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE EXTRACT(YEAR FROM tt.created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND tt.department LIKE '%HHP%' GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC"
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
            "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE EXTRACT(YEAR FROM tt.created_at::date) = EXTRACT(YEAR FROM CURRENT_DATE) AND tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC",
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
