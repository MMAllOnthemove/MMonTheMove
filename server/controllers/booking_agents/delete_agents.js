import { pool } from "../../db.js";

const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "DELETE FROM booking_agents WHERE unique_id = $1",
            [id]
        );
        res.status(201).json({ message: "Successfully deleted!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export default deleteAgent;
