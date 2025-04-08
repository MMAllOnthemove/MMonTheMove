import { pool } from "../../../../db.js";
<<<<<<< HEAD

=======
import "dotenv/config";
>>>>>>> origin/sockets-realtime
// GET all tasks
const GetAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT tt.*, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' WHERE tt.department LIKE '%HHP%' GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC`
        );
<<<<<<< HEAD
=======

>>>>>>> origin/sockets-realtime
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
            `SELECT tt.*, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id LEFT JOIN technician_tasks_images tti ON tt.id = tti.task_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC`,
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
            `SELECT tt.*, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id LEFT JOIN technician_tasks_images tti ON tt.id = tti.task_id WHERE tt.department LIKE '%HHP%' AND tt.ticket_number = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC`,
            [id]
        );
        return res.status(200).json(rows);
    } catch (err) {
<<<<<<< HEAD
=======
        console.log("get by ticket error", err);
>>>>>>> origin/sockets-realtime
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message,
        });
    }
};
<<<<<<< HEAD

=======
>>>>>>> origin/sockets-realtime
export { GetAllTasks, GetTaskById, GetTaskByTicket };
