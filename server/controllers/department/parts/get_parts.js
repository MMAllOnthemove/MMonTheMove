import { pool } from "../../../db.js";

const GetPartsForTask = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT id, unique_id, ticket_number, part_name, part_desc, 
                    seal_number, part_quantity, parts_status, created_at, 
                    compensation, part_issued, created_by, updated_at, credit_req_number
             FROM parts_for_tasks 
             WHERE task_row_id = $1 
             ORDER BY created_at DESC`,
            [id]
        );
        return res.status(200).json(rows);
    } catch (err) {
        console.error("Error fetching parts for task:", err); // Log for debugging
        return res.status(500).json({ error: "Failed to get parts" });
    }
};

export default GetPartsForTask;
