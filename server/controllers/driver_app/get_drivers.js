import { pool } from "../../db.js";

const getDrivers = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, driver_firstname, driver_lastname, created_at from drivers order by driver_firstname ,driver_lastname desc"
        );

        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getDrivers;
