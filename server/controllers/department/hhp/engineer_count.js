import { pool } from "./../../../db.js";

// Count how many engineers

const GetEngineerHeadCount = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT COUNT(DISTINCT engineer) as engineers_count, engineer FROM units GROUP BY engineer"
    );
    res.json(rows);
  } catch (error) {}
};
export default GetEngineerHeadCount;
