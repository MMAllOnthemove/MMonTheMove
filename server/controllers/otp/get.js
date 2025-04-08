import { pool } from "../../db.js";

const getOtp = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from otp WHERE created_at::date = current_date LIMIT 1"
        );

        if (rows.length === 0) {
            // If "no OTP for today" is a normal case and not an error, you could use 204 No Content. This status code means "successful request, but no content to send," which could be appropriate if you don’t consider a missing OTP to be an error.
            return res.status(204).json({ error: "No OTP created for today" });
        }

<<<<<<< HEAD
        return res.json({ otp: rows[0] });
=======
        return res.status(200).json({ otp: rows[0] });
>>>>>>> origin/sockets-realtime
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve OTP" });
    }
};

export default getOtp;
