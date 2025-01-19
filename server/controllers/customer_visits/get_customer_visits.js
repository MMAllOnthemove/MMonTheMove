import { pool } from "../../db.js";

const getCustomerVisits = async (req, res) => {
    const { id } = req.params;

    try {
        // const { rows } = await pool.query(
        //     "SELECT v.customer_id, v.visit_date, c.* FROM customer_visits v JOIN customers c ON v.customer_id = c.id WHERE v.visit_date::date = $1 order by v.visit_date desc",
        //     [id]
        // );
        const { rows } = await pool.query(
            "SELECT c.id AS customer_id, c.first_name || ' ' || c.last_name AS customer_name, c.email, c.phone_number AS phone, v.visit_date::date, COUNT(t.id) AS unit_count, ARRAY_AGG(t.ticket_number ORDER BY t.ticket_number DESC) AS ticket_numbers FROM customer_visits v JOIN customers c ON v.customer_id = c.id LEFT JOIN technician_tasks t ON t.date_booked::date = v.visit_date::date AND t.repairshopr_customer_id = c.repairshopr_customer_id  WHERE v.visit_date::date = $1 GROUP BY c.id, c.first_name, c.last_name, c.email, c.phone_number, v.visit_date::date ORDER BY v.visit_date::date DESC",
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
