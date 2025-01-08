import { pool } from "../../db.js";

const getCustomerVisits = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { rows } = await pool.query(
            "SELECT v.customer_id, v.visit_date, c.* FROM customer_visits v JOIN customers c ON v.customer_id = c.id WHERE v.visit_date::date = $1 order by v.visit_date desc",
            [id]
        );
       
        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : error.message, // Hide detailed error message in production
        });
    }
};

export default getCustomerVisits;
