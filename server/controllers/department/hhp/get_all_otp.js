import { pool } from "./../../../db.js";

const getAllOTP = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT otp, ip_address, created_at from otp ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {}
};

export default getAllOTP;
