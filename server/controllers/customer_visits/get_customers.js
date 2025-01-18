import { pool } from "../../db.js";

const getCustomers = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * from customers order by first_name, last_name desc"
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

export default getCustomers;
