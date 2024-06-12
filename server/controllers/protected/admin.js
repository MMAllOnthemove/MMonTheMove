import bcrypt from "bcrypt";
import "dotenv/config";
import { pool } from "../../db.js";

const AdminRoute = async (req, res) => {
  // console.log(req.user);
  // The current user object is available in req.user
  res.json({ message: "Admin resource", user: req.user });
};

export default AdminRoute;
