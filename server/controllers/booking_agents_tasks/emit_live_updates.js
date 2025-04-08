import { pool } from "../../db.js";
import { io } from "../../services/io.js";
import "dotenv/config";
const emitBookingStatsUpdate = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT id, unique_id, ticket_number, created_by, original_ticket_date, booking_agent, created_at FROM booking_agents_tasks order by original_ticket_date desc
        `);
        io.emit("bookingStatAdded", rows);
    } catch (err) {
        if (process.env.NODE_ENV !== "production")
            console.log("Error emitting bin stats update:", err);
    }
};
export default emitBookingStatsUpdate;
