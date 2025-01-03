import { pool } from "../../../db.js";

const getClaims = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id, unique_id, created_at, created_by, service_order_no, ticket_number, claim_status, department FROM claims order by created_at desc"
        );

        return res.status(200).json(rows); // Explicit 200 OK status
    } catch (error) {
        return res.status(500).json({ error: "Failed to get task, try again" });
    }
};

export default getClaims;
