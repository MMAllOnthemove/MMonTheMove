import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/token_generate.js";
import * as Yup from "yup";
import appLogs from "../logs/logs.js";

// Define Yup schema for request body validation
const signupSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required!"),
    repairshopr_id: Yup.number().required("Repairshopr ID is required!"),
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const SignupUser = async (req, res) => {
    try {
        await signupSchema.validate(req.body, { abortEarly: false });

        const { fullName, repairshopr_id, email, password, createdAt } =
            req.body;
        let capitalizedEmail = email?.toLowerCase();

        // Check if domain is allowed
        const emailRegex = /\@allelectronics.co.za$/;
        if (!emailRegex.test(capitalizedEmail)) {
            return res.status(401).json({ message: "Domain not allowed" });
        }

        // Check if user with the same email already exists
        const userExistsQuery = `
            SELECT * FROM company_people WHERE email = $1
        `;
        const userExistsResult = await pool.query(userExistsQuery, [
            capitalizedEmail,
        ]);

        if (userExistsResult.rows.length > 0) {
            return res.status(401).json({
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set createdAt to current date if not provided
        const createdDate = createdAt || new Date().toISOString();

        const result = await pool.query(
            "INSERT INTO company_people (full_name, repairshopr_id, email, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING full_name, repairshopr_id, email, user_id, user_role",
            [
                fullName,
                repairshopr_id,
                capitalizedEmail,
                hashedPassword,
                createdDate,
            ]
        );

        const user = result.rows[0];

        // Exclude password from the user object for the tokens
        const userForToken = {
            user_unique_id: user.user_unique_id,
            user_id: user.user_id,
            email: user.email,
            full_name: user.full_name,
            user_role: user.user_role,
            repairshopr_id: user.repairshopr_id,
        };

        // Generate tokens (without the password)
        const accessToken = generateAccessToken(userForToken);
        const refreshToken = generateRefreshToken(userForToken);

        await appLogs("INSERT", capitalizedEmail, user);

        // Set refresh token in the cookie (secure for production)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only set secure in production
            sameSite: "Strict", // for CSRF protection
        });

        // Respond with success message and access token
        return res.status(201).json({
            message: "Account created",
            token: accessToken,
        });
    } catch (error) {
        // Handle validation or other errors
        if (error.inner) {
            // Yup validation error
            const errors = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            return res.status(400).json({ errors });
        }

        // Generic error handling
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default SignupUser;
