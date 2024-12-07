import { pool } from "../../db.js";

const getFuelUsage = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from vehicle_fuel_consumption order by DATE(created_at)::text"
        );

        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getFuelUsage;
