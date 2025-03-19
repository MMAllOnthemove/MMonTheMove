import "dotenv/config";
import { pool } from "../../db.js";

const addAttachments = async (req, res) => {
    try {
        // Check if user with the same email already exists
        const imgExistsQuery = `
            SELECT * FROM technician_tasks_images WHERE image_url = $1
        `;
        const imgExistsResult = await pool.query(imgExistsQuery, [image_url]);

        if (imgExistsResult.rows.length > 0) return;

        const result = await pool.query(
            "INSERT INTO technician_tasks_images (task_id, image_url, created_at) values ($1, $2, $3)",
            [task_id, image_url, created_at]
        );


        return res.status(201).json({
            message: "File created",
        });
    } catch (error) {
        // Handle validation or other errors
        console.log("file add dev error", error);
    }
};

export default addAttachments;
