import bcrypt from "bcrypt";
import { pool } from "../../db.js";
import JwtGenerator from "../../utils/jwt-helpers.js";

// authentication

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  let capitalizedEmail = email.toLowerCase();
  const maxAge = 1 * 24 * 60 * 60;

  try {
    const user = await pool.query(
      "SELECT * FROM company_people WHERE email = $1",
      [capitalizedEmail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = JwtGenerator(user.rows[0].user_id);

    res.cookie("token", jwtToken, {
      withCredentials: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res
      .status(200)
      .json({ message: "User identified", token: jwtToken });
  } catch (err) {
    res.status(500).json("Server error");
  }
};
export default LoginUser;
