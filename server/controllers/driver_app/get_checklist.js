import { pool } from "../../db.js";

const getChecklists = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT *, TO_CHAR(created_at, 'YYYY-MM-DD') AS formatted_created_at, COALESCE(NULLIF(next_service_date, ''), '2000-01-01')::date::text as formatted_next_service_date from vehicle_checklist order by created_at desc"
        );

        return res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not fetch checklists" });
    }
};

export default getChecklists;
