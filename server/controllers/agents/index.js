import { pool } from "../../db.js";

const getAgents = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT user_id, user_unique_id, gspn_username from booking_agents"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAgents;
