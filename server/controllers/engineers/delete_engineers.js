import { pool } from "../../db.js";

const deleteEngineers = async (req, res) => {
  const { engineerId } = req.body;
  try {
    const { rows } = await pool.query(
      "DELETE FROM units WHERE unique_id = $1",
      [engineerId]
    );
    res.status(201).json("Successfully deleted!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default deleteEngineers;
