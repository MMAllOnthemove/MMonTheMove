import { pool } from "../../db.js";

const getComments = async (req, res) => {
    const { id, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    try {
        const { rows } = await pool.query(
            "SELECT * from technician_tasks_comments where task_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            [id, limit, offset]
        );

        const total = await pool.query(
            `SELECT COUNT(*) FROM technician_tasks_comments WHERE task_id = $1`,
            [id]
        );
        const totalComments = parseInt(total.rows[0].count, 10);
        return res.status(200).json({
            data: rows,
            meta: {
                currentPage: parseInt(page, 10),
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
