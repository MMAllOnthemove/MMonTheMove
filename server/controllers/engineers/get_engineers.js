import { pool } from "../../db.js";

const getEngineers = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, engineer_firstname, engineer_lastname, engineer_code, repairshopr_id, department from engineers order by engineer_firstname ,engineer_lastname desc"
        );

        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getEngineers;
