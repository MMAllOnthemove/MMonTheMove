import { pool } from "../../db.js";

const getDeviceName = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * from devices");

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Could not fetch devices" });
    }
};

export default getDeviceName;
