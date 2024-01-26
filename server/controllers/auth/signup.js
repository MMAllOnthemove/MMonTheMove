import bcrypt from "bcrypt";
import { pool } from "../../db.js";

const SignupUser = async (req, res) => {
  const { fullName, username, email, password, createdAt } = req.body;
  let capitalizedUsername = username.toLowerCase();
  let capitalizedFullName = fullName.toLowerCase();
  let capitalizedEmail = email.toLowerCase();
  const maxAge = 1 * 24 * 60 * 60;
  try {
    const user = await pool.query(
      "SELECT email FROM company_people WHERE email = $1",
      [email]
    );

    const emailRegex = /^[^@\s]+@allelectronics.co.za$/i;
    const checkEmailRegex = emailRegex.test(capitalizedEmail) === true;

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    } else if (checkEmailRegex) {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
        "INSERT INTO company_people (full_name, user_name, email, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          capitalizedFullName,
          capitalizedUsername,
          email,
          bcryptPassword,
          createdAt,
        ]
      );
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      res.cookie("token", jwtToken, {
        withCredentials: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      return res.json({ jwtToken });
    } else {
      return res.status(400).json("Signup failed; Invalid email or password");
    }
  } catch (err) {
    res.status(500).json("Server error");
  }
};
export default SignupUser;
