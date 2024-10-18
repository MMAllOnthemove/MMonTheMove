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
const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!")
        .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
});

const ForgotPassword = async (req, res) => {
    try {
        // Validate request body
        await forgotPasswordSchema.validate(req.body);

        const { email } = req.body;
    } catch (error) {
        console.error("Reset password failed:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export default ForgotPassword;
