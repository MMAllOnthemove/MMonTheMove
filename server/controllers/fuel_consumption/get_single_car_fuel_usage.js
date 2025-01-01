import { pool } from "../../db.js";

const getSingleCarFuelUsage = async (req, res) => {
    const { id } = req.params;
    try {
        // even though it's car_name it's really the plate number
        const { rows } = await pool.query(
            "SELECT * from vehicle_fuel_consumption where car_name = $1 order by DATE(created_at)::text desc limit 1",
            [id]
        );

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Could not find previous data" });
    }
};

export default getSingleCarFuelUsage;
