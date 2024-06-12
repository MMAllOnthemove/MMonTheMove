import { pool } from "../../db.js";


const getEngineers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, engineer_firstname, engineer_lastname, active from engineers ORDER BY engineer_firstname, engineer_lastname"
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default getEngineers;
