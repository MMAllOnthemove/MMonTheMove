import { pool } from "../../db.js";
import * as Yup from "yup";

const addCommentSchema = Yup.object({
    created_by: Yup.string(),
    created_at: Yup.string(),
    comment: Yup.string().required("Please add comment"),
});

const addComment = async (req, res) => {
    const { task_id, comment, created_at, created_by } = req.body;
    try {
        await addCommentSchema.validate(req.body, { abortEarly: false });

        // Check if agent already exists (optional, can be adjusted based on your use case)
        const { rows: existingComment } = await pool.query(
            "SELECT * FROM technician_tasks_comments WHERE task_id = $1 AND comment = $2",
            [task_id, comment]
        );

        if (existingComment.length > 0) {
            return res.status(409).json({ message: "Comment already exists" });
        }
        const { rows } = await pool.query(
            "INSERT INTO technician_tasks_comments (task_id, comment, created_at, created_by) VALUES ($1, $2, $3, $4)",
            [task_id, comment, created_at, created_by]
        );
        return res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        // Handle validation or other errors
        const errors = {};
        if (error.inner) {
            error.inner.forEach((err) => {
                errors[err.path] = err.message; // Collect field validation errors
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default addComment;