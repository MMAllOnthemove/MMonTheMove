import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/token_generate.js";
import * as Yup from "yup";
import nodemailer from "nodemailer";
// Login route
// authentication

// Define Yup schema for request body validation
const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    // .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
});

// Nodemailer setup (or use another email service)
const transporter = nodemailer.createTransport({
    host: `mail.mmallonthemove.co.za`,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: `noreply@mmallonthemove.co.za`,
        pass: `noreply@Password@2022@`,
    },
    tls: {
        rejectUnauthorized: false, // Set to false for development, or if you encounter certificate issues
    },
});

const ForgotPassword = async (req, res) => {
    try {
        // Validate request body
        await forgotPasswordSchema.validate(req.body, { abortEarly: false });

        const { email } = req.body;
        const emailRegex = /\@allelectronics.co.za$/;
        if (!emailRegex.test(email)) {
            return res.status(401).json({ message: "Domain not allowed" });
        } else {
            // Check if user exists in the database
            const result = await pool.query(
                "SELECT email, user_password FROM company_people WHERE email = $1",
                [email]
            );
            if (result.rows.length === 0) {
                return res.status(401).send({ message: "User not found" });
            }
            const user = result.rows[0];
            // Generate a JWT token with a short expiration
            const resetToken = generateAccessToken(user);
            // const refreshToken = generateRefreshToken(user);

            // Send an email with the reset link
            const resetLink = `${
                process.env.NODE_ENV !== "development" ? "https" : "http"
            }://${
                process.env.NEXT_PUBLIC_API_SERVER_URL
            }/reset-password?token=${resetToken}`;

            // Send the email using Nodemailer
            await transporter.sendMail(
                {
                    to: email,
                    subject: "Password Reset Request",
                    html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
                },
                (error, info) => {
                    if (error) {
                        // console.error("Error sending email:", error);
                    } else {
                        // console.log("Email sent:", info.response);
                    }
                }
            );

            return res.json({
                message: "Password reset link has been sent to your email",
            });
        }
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        // error.inner.forEach((err) => {
        //     errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        // });
        return res.status(500).json({ errors });
    }
};

export default ForgotPassword;
