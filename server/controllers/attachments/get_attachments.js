import { pool } from "../../db.js";
<<<<<<< HEAD

const getAttachments = async (req, res) => {
    let { id, page = 1, limit = 10 } = req.query;

    // Parse and validate `page` and `limit`
    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.max(parseInt(limit, 10) || 10, 1);
=======
import "dotenv/config";

const getAttachments = async (req, res) => {
    let { id, page = 1, limit = 5 } = req.query;

    // Parse and validate `page` and `limit`
    page = Math.max(parseInt(page, 5) || 1, 1);
    limit = Math.max(parseInt(limit, 5) || 5, 1);
>>>>>>> origin/sockets-realtime
    const offset = (page - 1) * limit;

    try {
        // Fetch paginated attachments with total count in one query
        const { rows } = await pool.query(
            `SELECT *, COUNT(*) OVER() AS total_count 
             FROM technician_tasks_images 
             WHERE task_id = $1 
             ORDER BY created_at DESC 
             LIMIT $2 OFFSET $3`,
            [id, limit, offset]
        );

        // Extract total count from the first row (only if data exists)
        const totalAttachments =
<<<<<<< HEAD
            rows.length > 0 ? parseInt(rows[0].total_count, 10) : 0;
=======
            rows.length > 0 ? parseInt(rows[0].total_count, 5) : 0;
>>>>>>> origin/sockets-realtime

        return res.status(200).json({
            data: rows,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(totalAttachments / limit),
                totalAttachments,
            },
        });
    } catch (error) {
<<<<<<< HEAD
        console.error("Error fetching attachments:", error);
=======
>>>>>>> origin/sockets-realtime
        return res.status(500).json({
            message: "Could not get attachments",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide detailed error message in production
        });
    }
};

export default getAttachments;
