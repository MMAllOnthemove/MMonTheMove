import { pool } from "../../../db.js";

const createOTP = async (req, res) => {
  const { ipAddress, otp } = req.body;
  const created_at = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
  )
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

  const date_added = new Date().toISOString().split("T")[0];

  try {
    const hasOTPBeenUsed = await pool.query(
      "SELECT otp from otp where otp = $1 AND date_added = $2",
      [otp, date_added]
    );

    if (hasOTPBeenUsed.rows.length > 0) {
      res.status(400).send("OTP has been used");
    } else {
      await pool.query(
        "INSERT INTO otp (ip_address, otp, created_at, date_added) VALUES ($1, $2, $3, $4)",
        [ipAddress, otp, created_at, date_added]
      );
      res.status(201).json("otp created, thank you!");
    }
  } catch (err) {
    //  console.log(err)
  }
};

export default createOTP;
