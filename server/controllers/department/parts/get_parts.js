import { pool } from "../../../db.js";

// GET all table info from database

const GetPartsForTask = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, ticket_number, part_name, part_desc, seal_number, part_quantity, parts_status, created_at, compensation, created_by, updated_at FROM  parts_for_tasks WHERE task_row_id = $1",
            [id]
        );
        return res.json(rows);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get parts" });
    }
};

export default GetPartsForTask;
