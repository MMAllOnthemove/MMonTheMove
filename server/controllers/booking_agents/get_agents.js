import { pool } from "../../db.js";
<<<<<<< HEAD

=======
import "dotenv/config";
>>>>>>> origin/sockets-realtime
const getAgents = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, unique_id, agent_firstname, agent_lastname, department 
             FROM booking_agents 
             ORDER BY id DESC` // Sorting by ID if it's a primary key (faster)
        );

        return res.status(200).json(rows);
    } catch (error) {
<<<<<<< HEAD
        console.error("Error fetching agents:", error);
=======
>>>>>>> origin/sockets-realtime
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
