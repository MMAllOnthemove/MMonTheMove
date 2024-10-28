import { pool } from "../../db.js";

const getAgents = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, agent_firstname, agent_lastname, department from booking_agents order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        console.log("get booking_agents error", error);
        res.status(500).json({ error: error.message });
    }
};

export default getAgents;
