import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import "dotenv/config";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/token_generate.js";
import * as Yup from "yup";

// Define Yup schema for request body validation
const signupSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Fullname is required!")
        .min(4, "Fullname must be minimum 4 characters!"),
    username: Yup.string()
        .required("Username is required!")
        .min(4, "Username must be minimum 4 characters!"),
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    // .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
});

const SignupUser = async (req, res) => {
    try {
        await signupSchema.validate(req.body, { abortEarly: false });
        const { fullName, username, email, password, createdAt } = req.body;
        let capitalizedEmail = email.toLowerCase();
        // Check if domain is allowed
        const emailRegex = /\@allelectronics.co.za$/;

        if (!emailRegex.test(capitalizedEmail)) {
            res.status(401).json({ message: "Domain not allowed" });
            return;
        } else {
            // Check if user with the same email or username already exists
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
            const result = await pool.query(
                "INSERT INTO company_people (full_name, user_name, email, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING full_name, user_name, email, user_id, user_role",
                [
                    fullName,
                    username,
                    capitalizedEmail,
                    hashedPassword,
                    createdAt,
                ]
            );
            const user = result.rows[0];
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
            });
            res.status(201).json({
                message: "Account created",
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
export default SignupUser;
