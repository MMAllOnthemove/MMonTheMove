import { pool } from "../../../../db.js";

// GET all tasks
const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT tt.*, 
                COALESCE(d.marketing_name, '') AS phone_name 
            FROM technician_tasks tt
            LEFT JOIN LATERAL (
                SELECT d.marketing_name 
                FROM devices d
                WHERE d.company = 'Samsung' AND d.device_model LIKE tt.model || '%'
                LIMIT 1
            ) d ON true
            WHERE tt.department ILIKE 'HHP%'
            ORDER BY tt.date_booked DESC`
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message,
        });
    }
};

// GET task by ID
const GetTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            `SELECT tt.*, 
                COALESCE(d.marketing_name, '') AS phone_name 
            FROM technician_tasks tt
            LEFT JOIN LATERAL (
                SELECT d.marketing_name 
                FROM devices d
                WHERE d.company = 'Samsung' AND d.device_model LIKE tt.model || '%'
                LIMIT 1
            ) d ON true
            WHERE tt.department ILIKE 'HHP%' AND tt.id = $1
            ORDER BY tt.date_booked DESC`,
            [id]
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message,
        });
    }
};

// GET task by ticket number (for file upload screen)
const GetTaskByTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            `SELECT tt.*, 
                COALESCE(d.marketing_name, '') AS phone_name 
            FROM technician_tasks tt
            LEFT JOIN LATERAL (
                SELECT d.marketing_name 
                FROM devices d
                WHERE d.company = 'Samsung' AND d.device_model LIKE tt.model || '%'
                LIMIT 1
            ) d ON true
            WHERE tt.department ILIKE 'HHP%' AND tt.ticket_number = $1`,
            [id]
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message,
        });
    }
};

export { GetAllTasks, GetTaskById, GetTaskByTicket };
