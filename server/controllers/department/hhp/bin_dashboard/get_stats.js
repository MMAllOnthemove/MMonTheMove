import { pool } from "../../../../db.js";

// GET all table info from database

const GetBinStats = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT engineer, unit_status, COUNT(*) AS units_count, ARRAY_AGG(ticket_number) AS ticket_numbers FROM technician_tasks where unit_status IN ('New', 'In Progress', 'Customer Reply', 'Assigned to Tech', 'Parts Request 1st Approval', 'QC', 'QC Failed', 'Parts to be ordered') GROUP BY engineer, unit_status ORDER BY engineer, unit_status"
        );
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get bin stats" });
    }
};

export default GetBinStats;
