import jwt from "jsonwebtoken";
import "dotenv/config";
import { pool } from "../db.js";

function UserVerification(req, res, next) {
  // Get token from header
  // const token = req.header("jwt_token");
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(
    token,
    process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
    async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await pool.query(
          "SELECT email FROM company_people WHERE user_id = $1",
          [data.user.id]
        );
        if (user) return res.json(user.rows[0]);
        else return res.json({ status: false });
      }
    }
  );
}
export default UserVerification;
