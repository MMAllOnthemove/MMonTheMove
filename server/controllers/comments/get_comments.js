import { pool } from "../../db.js";
<<<<<<< HEAD

=======
import "dotenv/config";
>>>>>>> origin/sockets-realtime
const getComments = async (req, res) => {
    let { id, page = 1, limit = 10 } = req.query;

    // Parse and validate `page` and `limit`
    page = Math.max(parseInt(page, 10), 1); // Ensure `page` is at least 1
    limit = Math.max(parseInt(limit, 10), 1); // Ensure `limit` is at least 1
    const offset = (page - 1) * limit;

    try {
        // Fetch comments for the task
        const { rows } = await pool.query(
            "SELECT * FROM technician_tasks_comments WHERE task_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            [id, limit, offset]
        );

        // Fetch the total count of comments
        const total = await pool.query(
            "SELECT COUNT(*) FROM technician_tasks_comments WHERE task_id = $1",
            [id]
        );
        const totalComments = parseInt(total.rows[0].count, 10);

        return res.status(200).json({
            data: rows,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(totalComments / limit),
                totalComments,
            },
        }); // Explicit 200 OK status
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide detailed error message in production
        });
    }
};

export default getComments;
