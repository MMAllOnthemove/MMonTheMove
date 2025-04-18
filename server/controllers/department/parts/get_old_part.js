import { pool } from "../../../db.js";

const GetOldParts = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT id, unique_id, ticket_number, part_name, part_desc, 
                    seal_number, part_quantity, parts_status, created_at, 
                    compensation, part_issued, part_returned, created_by, updated_at, credit_req_number
             FROM parts_for_tasks 
             WHERE task_row_id = $1 
             AND is_old_part = true
             ORDER BY created_at DESC`,
            [id]
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get parts" });
    }
};

export default GetOldParts;
