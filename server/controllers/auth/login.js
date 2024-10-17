import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/token_generate.js";
import * as Yup from "yup";

// Login route
// authentication

// Define Yup schema for request body validation
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const LoginUser = async (req, res) => {
    try {
        // Validate request body
        await loginSchema.validate(req.body);

        const { email, password } = req.body;
        const result = await pool.query(
            "SELECT email, user_password FROM company_people WHERE email = $1",
            [email]
        );
        const selectUser = await pool.query(
            "SELECT user_unique_id as user_id, email, full_name, user_name, user_role, department FROM company_people WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        });
       res.status(201).json({
           message: "Successfully logged in",
           token: accessToken,
       });
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default LoginUser;
