import { pool } from "../../../../db.js";
import appLogs from "../../../logs/logs.js";

export const UpdateSOAfterBooking = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    const { service_order, updated_by, updated_at, ticket_number } = req.body; // Get the changed fields from the frontend

    if (!id) return;
    try {
        const query = await pool.query(
            "UPDATE technician_tasks SET service_order_no = $1, updated_by = $2, updated_at = $3 WHERE ticket_number = $4 returning ticket_number",
            [service_order, updated_by, updated_at, id]
        );
        const getDataBack = await pool.query(
            "select * from technician_tasks  WHERE ticket_number = $1",
            [query.rows[0]?.ticket_number]
        );
        await appLogs("UPDATE", updated_by, req.body, id, ticket_number);
        return res.status(200).json({
            message: "HHP task updated",
            task: getDataBack.rows[0],
        });
    } catch (error) {
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
