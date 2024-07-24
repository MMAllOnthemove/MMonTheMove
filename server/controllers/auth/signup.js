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
    .required("Email is required!")
    .matches(/\@allelectronics.co.za$/),
  password: Yup.string()
    .required("Please Enter password")
    .min(6, "Password must be minimum 6 characters!"),
});

const SignupUser = async (req, res) => {
  try {
    await signupSchema.validate(req.body);
    const { fullName, username, email, password, createdAt } = req.body;
    let capitalizedEmail = email.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO company_people (full_name, user_name, email, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING full_name, user_name, email, user_id, user_role",
      [fullName, username, capitalizedEmail, hashedPassword, createdAt]
    );
    const user = result.rows[0];
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default SignupUser;
