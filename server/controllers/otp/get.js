import { pool } from "../../db.js";

const getOtp = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from otp WHERE created_at::date = current_date LIMIT 1"
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "No OTP created for today" });
        }

        res.json({ otp: rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve OTP" });
    }
};

export default getOtp;
