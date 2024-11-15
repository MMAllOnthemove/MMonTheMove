import { pool } from "../../db.js";

const getChecklists = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT *, TO_CHAR(created_at, 'YYYY-MM-DD') AS formatted_created_at, COALESCE(DATE(next_service_date)::text, '') as formatted_next_service_date from vehicle_checklist order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getChecklists;
