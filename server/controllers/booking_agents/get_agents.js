import { pool } from "../../db.js";

const getAgents = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, agent_firstname, agent_lastname, department from booking_agents order by created_at desc"
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

export default getAgents;
