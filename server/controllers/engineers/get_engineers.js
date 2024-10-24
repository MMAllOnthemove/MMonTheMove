import { pool } from "../../db.js";

const getEngineers = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, engineer_firstname ,engineer_lastname, department from engineers order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        console.log("getEngineers error", error);
        res.status(500).json({ error: error.message });
    }
};

export default getEngineers;
