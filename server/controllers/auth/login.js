import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/token_generate.js";
import * as Yup from "yup";
import LoginHistory from "./login_history.js";
// Login route
// authentication

// Define Yup schema for request body validation
const loginSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    // .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const LoginUser = async (req, res) => {
    try {
        // Validate request body
        await loginSchema.validate(req.body, { abortEarly: false });

        const { email, password } = req.body;
        const emailRegex = /\@allelectronics.co.za$/;
        if (!emailRegex.test(email)) {
            res.status(401).json({ message: "Domain not allowed" });
            return;
        } else {
            const result = await pool.query(
                "SELECT email, user_password FROM company_people WHERE email = $1",
                [email]
            );
            const selectUser = await pool.query(
                "SELECT user_unique_id, user_id, email, full_name, user_name, user_role, department FROM company_people WHERE email = $1",
                [email]
            );

            if (result.rows.length === 0) {
                // Add the user to login history table as failed
                await LoginHistory(
                    selectUser.rows[0].user_id,
                    "password",
                    "failure"
                );
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = selectUser.rows[0];
            const validPassword = await bcrypt.compare(
                password,
                result.rows[0].user_password
            );

            if (!validPassword) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Add the user to login history table as success
            await LoginHistory(
                selectUser.rows[0].user_id,
                "password",
                "success"
            );
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
            });
            res.status(201).json({
                message: "Successfully logged in",
                token: accessToken,
            });
        }
    } catch (error) {
     

        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default LoginUser;
