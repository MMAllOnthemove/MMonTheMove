import { pool } from "../../../db.js";
import "dotenv/config";
// GET all table info from database

const GetAssemblyTerms = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * from assembly_terms");
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production" ? undefined : err.message, // Hide detailed error message in production
        });
    }
};
export default GetAssemblyTerms;
