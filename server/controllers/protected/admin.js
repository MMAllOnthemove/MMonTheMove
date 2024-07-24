import bcrypt from "bcrypt";
import "dotenv/config";
import { pool } from "../../db.js";

const AdminRoute = async (req, res) => {
  // The current user object is available in req.user
  res.json({ message: "Admin resource", user: req.user });
};

export default AdminRoute;
