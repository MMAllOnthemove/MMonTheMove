import { pool } from "../../db.js";

const getChecklists = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from vehicle_checklist order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getChecklists;
