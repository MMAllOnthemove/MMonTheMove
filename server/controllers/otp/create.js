import * as Yup from "yup";
import { pool } from "../../db.js";
import { io } from "../../services/io.js";

const otpSchema = Yup.object({
    created_by: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    // .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
    otp_code: Yup.string()
        .required("Please Enter otp")
        .min(5, "Otp must be 5 characters!")
        .max(5, "Otp must 5 characters!"),
});

const createOTP = async (req, res) => {
    // Validate request body
    await otpSchema.validate(req.body, { abortEarly: false });
    const { created_by, otp_code } = req.body;
    console.log(created_by, otp_code);
    const created_at = new Date(
        Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
    )
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");

    try {
        const hasOTPBeenUsed = await pool.query(
            "SELECT otp_code from otp where otp_code = $1 AND created_at::date = $2 LIMIT 1",
            [otp_code, created_at]
        );

        if (hasOTPBeenUsed.rows.length > 0) {
            return res.status(401).json({ message: "OTP already exists" });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO otp (created_by, otp_code, created_at) VALUES ($1, $2, $3) returning otp_code",
                [created_by, otp_code, created_at]
            );
            return res.status(201).json({
                message: "New OTP added!",
                otp: rows[0]?.otp_code,
            });
        }
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        if (error.inner) {
            error?.inner?.forEach((err) => {
                errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
            });
            return res.status(500).json({ errors });
        }
        // Handle other errors
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default createOTP;
