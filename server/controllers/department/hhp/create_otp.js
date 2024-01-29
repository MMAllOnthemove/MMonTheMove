import { pool } from "../../../db.js";

const createOTP = async (req, res) => {
  const { ipAddress, otp } = req.body;
  const created_at = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
  )
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

  try {
    const hasOTPBeenUsed = await pool.query(
      "SELECT otp from otp where otp = $1",
      [otp]
    );
    const wasOTPCreatedToday = await pool.query(
      "SELECT created_at from otp where created_at = $1",
      [created_at]
    );
    if (hasOTPBeenUsed.rowCount > 0 || wasOTPCreatedToday.rowCount > 0) {
      res.status(400).send("OTP has been used before");
    } else {
      await pool.query(
        "INSERT INTO otp (ip_address, otp, created_at) VALUES ($1, $2, $3)",
        [ipAddress, otp, created_at]
      );
      res.status(201).json("otp created, thank you!");
    }
  } catch (err) {
    console.log(err)
  }
};

export default createOTP;
