import { pool } from "../../db.js";

const getBookingAgentsTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, ticket_number, created_by, booking_agent, created_at FROM booking_agents_tasks order by created_at desc"
        );

        res.json(rows);
    } catch (error) {
        console.log("get booking_agents tasks error", error);
        res.status(500).json({ error: error.message });
    }
};

export default getBookingAgentsTasks;
