import { pool } from "../../db.js";

const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "DELETE FROM booking_agents WHERE unique_id = $1",
            [id]
        );
     
        return res.status(200).json({ message: "Successfully deleted!" }); // 204 No Content for successful deletion
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default deleteAgent;
