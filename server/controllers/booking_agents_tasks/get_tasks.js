import { pool } from "../../db.js";
import "dotenv/config";
const getBookingAgentsTasks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, ticket_number, created_by, original_ticket_date, booking_agent, created_at FROM booking_agents_tasks order by original_ticket_date desc"
        );
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide detailed error message in production
        });
    }
};

export default getBookingAgentsTasks;
