import bcrypt from "bcrypt";
import "dotenv/config";
import { pool } from "../../db.js";

const CurrentUser = async (req, res) => {
  // The current user object is available in req.user
  res.json({ user: req.user });
};

export default CurrentUser;
