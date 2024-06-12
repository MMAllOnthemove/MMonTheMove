import { pool } from "./../../../db.js";

const getOTP = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT otp from otp WHERE created_at::date = current_date LIMIT 1"
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default getOTP;
