import { pool } from "./../../../db.js";

const getOTP = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT otp from otp WHERE created_at::date = current_date"
    );

    res.json(rows);
  } catch (error) {}
};

export default getOTP;
