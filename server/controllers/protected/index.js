import bcrypt from "bcrypt";
import "dotenv/config";
import { pool } from "../../db.js";

const ProtectedRoute = async (req, res) => {
    try {
        // Add your protected route logic here
        res.json({ message: "Protected resource" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default ProtectedRoute;
