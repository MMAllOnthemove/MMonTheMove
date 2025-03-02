import { pool } from "../../db.js";
import "dotenv/config";
const getAgents = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, unique_id, agent_firstname, agent_lastname, department 
             FROM booking_agents 
             ORDER BY id DESC` // Sorting by ID if it's a primary key (faster)
        );

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide error details in production
        });
    }
};

export default getAgents;
