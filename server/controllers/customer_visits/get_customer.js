import { pool } from "../../db.js";
import "dotenv/config";
const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "SELECT * from customers where email = $1",
            [id]
        );
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide detailed error message in production
        });
    }
};

export default getCustomer;
